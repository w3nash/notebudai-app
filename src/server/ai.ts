"use server";

import { createAmazonBedrock } from "@ai-sdk/amazon-bedrock";
import { fromNodeProviderChain } from "@aws-sdk/credential-providers";
import { generateObject, type Message } from "ai";
import type { User } from "next-auth";
import { z } from "zod";

export async function createModel() {
  const bedrock = createAmazonBedrock({
    region: "us-east-1",
    credentialProvider: fromNodeProviderChain(),
  });

  return bedrock("us.anthropic.claude-3-7-sonnet-20250219-v1:0");
}

export const generateQuery = async (messages: Message[], user: User) => {
  const model = await createModel();
  const messageHistory = JSON.stringify(messages);
  const systemPrompt = `
You are a SQL (postgres) and data management expert. Your job is to help the user write a SQL query to retrieve the data they need from their note-taking application. The table schema is as follows:

public."Folder" (
  id TEXT NOT NULL,
  name TEXT NOT NULL,
  "userId" TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
  "updatedAt" TIMESTAMP(3) WITHOUT TIME ZONE NOT NULL
);

public."Note" (
  id TEXT NOT NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  summary TEXT,
  qa JSONB,
  "mindMap" JSONB,
  "folderId" TEXT NOT NULL,
  "userId" TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
  "updatedAt" TIMESTAMP(3) WITHOUT TIME ZONE NOT NULL,
  "isFavorite" BOOLEAN DEFAULT FALSE NOT NULL
);

public."Tag" (
  id TEXT NOT NULL,
  name TEXT NOT NULL,
  "userId" TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
  "updatedAt" TIMESTAMP(3) WITHOUT TIME ZONE NOT NULL
);

public."User" (
  id TEXT NOT NULL,
  name TEXT,
  email TEXT,
  "emailVerified" TIMESTAMP(3) WITHOUT TIME ZONE,
  image TEXT
);


Only retrieval queries are allowed.

For string fields like name, title, and content, use the ILIKE operator and convert both the search term and the field to lowercase using the LOWER() function. For example: LOWER(name) ILIKE LOWER('%search_term%').

When answering questions about a specific field, ensure you are selecting the identifying column (e.g., what is the title of a note would select title and content).

If the user asks for a category or tag that is not in the list, infer based on the available data.

When searching for users, ensure to include their id, email, and name for identification.
Use this user information to answer questions:
User ID: ${user.id}, Name: ${user.name ?? "N/A"}, Email: ${user.email ?? "N/A"}
STRICTLY: RETURN ONLY INFORMATION FOR THIS USER!
STRICTLY: DON'T RETURN ANY OTHER USER'S DATA!

There should always be at least two columns. If the user asks for a single column, return the column and the

STRICTLY: RETURN ONLY SQL QUERIES!
Example: "SELECT name FROM "Folder" WHERE LOWER(name) ILIKE LOWER('%recent%');"

STRICTLY: RETURN EMPTY QUERY IF THE USER DOESN'T SEEMS NEED TO QUERY THE DATABASE.
Example: The user said "Hi!" - Return an empty query.
    `.trim();

  try {
    const result = await generateObject({
      model,
      system: systemPrompt,
      prompt: `Generate the query necessary to retrieve the data the user wants: ${messageHistory}`,
      schema: z.object({
        query: z.string(),
      }),
    });
    return result.object.query;
  } catch (e) {
    console.error(e);
    throw new Error("Failed to generate query");
  }
};
