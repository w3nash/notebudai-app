"use server";

import { db } from "@/server/db";
import { getAuthenticatedUser } from "../user";

export async function addTagToNote(data: { id: string; tagId: string }) {
  const user = await getAuthenticatedUser();

  try {
    await db.note.update({
      where: { id: data.id, userId: user.id },
      data: {
        tags: {
          connect: { id: data.tagId },
        },
      },
    });
  } catch (error) {
    console.error("Error adding tag to note:", error);
    throw new Error("Failed to add tag to note.");
  }
}

export async function removeTagFromNote(data: { id: string; tagId: string }) {
  const user = await getAuthenticatedUser();

  try {
    await db.note.update({
      where: { id: data.id, userId: user.id },
      data: {
        tags: {
          disconnect: { id: data.tagId },
        },
      },
    });
  } catch (error) {
    console.error("Error removing tag from note:", error);
    throw new Error("Failed to remove tag from note.");
  }
}
