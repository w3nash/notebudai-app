/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { createModel, generateQuery } from "@/server/ai";
import { getAuthenticatedUser } from "@/server/user";
import { streamText, type CoreMessage, type Message } from "ai";
import { type NextRequest, NextResponse } from "next/server";
import { db } from "@/server/db";
import type { User } from "next-auth";

export async function POST(request: NextRequest) {
  const user: User = await getAuthenticatedUser();

  try {
    // Parse the request body
    const { messages }: { messages: Message[] } = await request.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: "Invalid request: Messages must be a non-empty array." },
        { status: 400 },
      );
    }

    const model = await createModel();

    // Generate sql query based on the conversation history, the latest message of the user, and the user information
    if (
      !messages?.every((msg) => typeof msg === "object" && "content" in msg)
    ) {
      return NextResponse.json(
        {
          error:
            "Invalid request: Messages must be an array of objects with a 'content' property.",
        },
        { status: 400 },
      );
    }

    const query = await generateQuery(messages, user);
    const context = await db.$queryRawUnsafe(query);

    // Convert BigInt to String before stringifying
    if (!Array.isArray(context)) {
      throw new Error("Query result is not an array.");
    }
    const contextForJson = context.map((item: Record<string, unknown>) => {
      const newItem = { ...item }; // Create a copy to avoid modifying the original object
      for (const key in newItem) {
        if (typeof newItem[key] === "bigint") {
          newItem[key] = String(newItem[key]);
        }
      }
      return newItem;
    });
    const contextJson = JSON.stringify(contextForJson, null, 2);

    // Create the system prompt
    const systemPrompt = `
        Your name is Bud.
        You are a helpful AI assistant of an AI powered note-taking application.  You will be given a context, which is from the database, and you must generate a response that will help the user find information from the context.

        Use this as the context:
        ${contextJson}

        If the context is empty, it means that the user does not require to query the database, strictly do not mention that there is no context.

        If the context has a date, format it like this:
        January 15, 2022 12:00 PM

        STRICTLY: If the context has a unique identifier, exclude it from the response.
    `.trim();

    const formattedMessages = [
      { role: "system", content: systemPrompt },
      ...messages.map((m: Message) => ({
        role: m.role === "user" ? "user" : "assistant",
        content: m.content,
      })),
    ] as CoreMessage[];

    const result = streamText({
      model,
      messages: formattedMessages,
    });

    return result.toDataStreamResponse();
  } catch (error) {
    console.error("Chat API error:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { error: "Internal server error: " + errorMessage },
      { status: 500 },
    );
  }
}
