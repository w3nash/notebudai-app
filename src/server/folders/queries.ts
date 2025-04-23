"use server";

import { db } from "@/server/db";
import { getAuthenticatedUser } from "../user";

export async function getFolders() {
  const user = await getAuthenticatedUser();

  try {
    const folders = await db.folder.findMany({
      where: { userId: user.id },
    });
    return folders;
  } catch (error) {
    console.error("Error fetching folders:", error);
    throw new Error("Failed to fetch folders.");
  }
}

export async function getFolder(id: string) {
  const user = await getAuthenticatedUser();
  try {
    const folder = await db.folder.findUnique({
      where: { id, userId: user.id },
    });
    return folder;
  } catch (error) {
    console.error("Error fetching folder:", error);
    throw new Error("Failed to fetch folder.");
  }
}
