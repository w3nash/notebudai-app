"use server";

import { db } from "@/server/db";
import { getAuthenticatedUser } from "./user";
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
