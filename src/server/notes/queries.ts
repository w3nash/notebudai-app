"use server";

import { db } from "@/server/db";
import { getAuthenticatedUser } from "../user";

export async function getNotes() {
  const user = await getAuthenticatedUser();

  try {
    const notes = await db.note.findMany({
      where: { userId: user.id },
      include: {
        folder: true,
        tags: true,
      },
      orderBy: {
        updatedAt: "desc",
      },
    });
    return notes;
  } catch (error) {
    console.error("Error fetching notes:", error);
    throw new Error("Failed to fetch notes.");
  }
}

export async function getNote(id: string) {
  const user = await getAuthenticatedUser();

  try {
    const note = await db.note.findUnique({
      where: { id, userId: user.id },
      include: {
        folder: true,
        tags: true,
      },
    });
    return note;
  } catch (error) {
    console.error("Error fetching note:", error);
    throw new Error("Failed to fetch note.");
  }
}

export async function getNotesByFolder(folderId: string) {
  const user = await getAuthenticatedUser();

  try {
    const notes = await db.note.findMany({
      where: {
        folderId,
        userId: user.id,
      },
      include: {
        tags: true,
        folder: true,
      },
      orderBy: {
        updatedAt: "desc",
      },
    });
    return notes;
  } catch (error) {
    console.error("Error fetching notes by folder:", error);
    throw new Error("Failed to fetch notes by folder.");
  }
}

export async function getNotesByTag(tagId: string) {
  const user = await getAuthenticatedUser();

  try {
    const notes = await db.note.findMany({
      where: {
        userId: user.id,
        tags: {
          some: {
            id: tagId,
          },
        },
      },
      include: {
        folder: true,
        tags: true,
      },
      orderBy: {
        updatedAt: "desc",
      },
    });
    return notes;
  } catch (error) {
    console.error("Error fetching notes by tag:", error);
    throw new Error("Failed to fetch notes by tag.");
  }
}

export async function getFavoriteNotes() {
  const user = await getAuthenticatedUser();

  try {
    const notes = await db.note.findMany({
      where: {
        userId: user.id,
        isFavorite: true,
      },
      include: {
        folder: true,
        tags: true,
      },
      orderBy: {
        updatedAt: "desc",
      },
    });
    return notes;
  } catch (error) {
    console.error("Error fetching favorite notes:", error);
    throw new Error("Failed to fetch favorite notes.");
  }
}

export async function getRecentNotes() {
  const user = await getAuthenticatedUser();

  try {
    const notes = await db.note.findMany({
      where: {
        userId: user.id,
      },
      include: {
        folder: true,
        tags: true,
      },
      orderBy: {
        updatedAt: "desc",
      },
      take: 5,
    });
    return notes;
  } catch (error) {
    console.error("Error fetching recent notes:", error);
    throw new Error("Failed to fetch recent notes.");
  }
}
