"use server";

import { db } from "@/server/db";
import { getAuthenticatedUser } from "../user";

export async function createTag(data: { name: string }) {
  const user = await getAuthenticatedUser();

  try {
    const tag = await db.tag.create({
      data: { ...data, userId: user.id },
    });
    return tag;
  } catch (error) {
    console.error("Error creating tag:", error);
    throw new Error("Failed to create tag.");
  }
}

export async function updateTag(id: string, data: { name: string }) {
  const user = await getAuthenticatedUser();

  try {
    const tag = await db.tag.update({
      where: { id, userId: user.id },
      data,
    });
    return tag;
  } catch (error) {
    console.error("Error updating tag:", error);
    throw new Error("Failed to update tag.");
  }
}

export async function deleteTag(data: { id: string }) {
  const user = await getAuthenticatedUser();

  try {
    await db.tag.delete({
      where: { id: data.id, userId: user.id },
    });
  } catch (error) {
    console.error("Error deleting tag:", error);
    throw new Error("Failed to delete tag.");
  }
}
