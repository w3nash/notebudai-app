"use server";

import { db } from "@/server/db";
import { getAuthenticatedUser } from "../user";

export async function createFolder(data: { name: string }) {
  const user = await getAuthenticatedUser();

  data.name = data.name.trim();

  try {
    const folder = await db.folder.create({
      data: { ...data, userId: user.id },
    });
    return folder;
  } catch (error) {
    console.error("Error creating folder:", error);
    throw new Error("Failed to create folder.");
  }
}

export async function updateFolder(id: string, data: { name: string }) {
  const user = await getAuthenticatedUser();

  data.name = data.name.trim();

  try {
    const folder = await db.folder.update({
      where: { id, userId: user.id },
      data,
    });
    return folder;
  } catch (error) {
    console.error("Error updating folder:", error);
    throw new Error("Failed to update folder.");
  }
}

export async function deleteFolder(data: { id: string }) {
  const user = await getAuthenticatedUser();

  try {
    await db.folder.delete({
      where: { id: data.id, userId: user.id },
    });
  } catch (error) {
    console.error("Error deleting folder:", error);
    throw new Error("Failed to delete folder.");
  }
}
