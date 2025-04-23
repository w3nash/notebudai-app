"use server";

import { db } from "@/server/db";
import { getAuthenticatedUser } from "../user";

export async function getTags() {
  const user = await getAuthenticatedUser();

  try {
    const tags = await db.tag.findMany({
      where: { userId: user.id },
    });
    return tags;
  } catch (error) {
    console.error("Error fetching tags:", error);
    throw new Error("Failed to fetch tags.");
  }
}
