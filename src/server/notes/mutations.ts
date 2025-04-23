/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { db } from "@/server/db";
import { getAuthenticatedUser } from "../user";
import type { QuizData } from "../types/quiz";

export async function createNote(data: {
  title: string;
  content: string;
  folderId: string;
  tagIds?: string[];
  summary?: string;
  qa?: QuizData;
  mindMap?: any;
  isFavorite?: boolean;
}) {
  const user = await getAuthenticatedUser();
  const { tagIds, ...noteData } = data;

  try {
    const note = await db.note.create({
      data: {
        ...noteData,
        userId: user.id,
        // Connect tags if they exist
        ...(tagIds && tagIds.length > 0
          ? {
              tags: {
                connect: tagIds.map((id) => ({ id })),
              },
            }
          : {}),
      },
      include: {
        folder: true,
        tags: true,
      },
    });
    return note;
  } catch (error) {
    console.error("Error creating note:", error);
    throw new Error("Failed to create note.");
  }
}

export async function updateNote(
  id: string,
  data: {
    title?: string;
    content?: string;
    folderId?: string;
    tagIds?: string[];
    summary?: string;
    qa?: QuizData;
    mindMap?: any;
    isFavorite?: boolean;
  },
) {
  const user = await getAuthenticatedUser();
  const { tagIds, ...noteData } = data;

  try {
    // First get the current note to check if we need to update tags
    const existingNote = await db.note.findUnique({
      where: { id, userId: user.id },
      include: { tags: true },
    });

    if (!existingNote) {
      throw new Error("Note not found");
    }

    const note = await db.note.update({
      where: { id, userId: user.id },
      data: {
        ...noteData,
        // Update tags if provided
        ...(tagIds
          ? {
              tags: {
                set: [], // First disconnect all tags
                connect: tagIds.map((id) => ({ id })), // Then connect the new ones
              },
            }
          : {}),
      },
      include: {
        folder: true,
        tags: true,
      },
    });
    return note;
  } catch (error) {
    console.error("Error updating note:", error);
    throw new Error("Failed to update note.");
  }
}

export async function deleteNote(data: { id: string }) {
  const user = await getAuthenticatedUser();

  try {
    await db.note.delete({
      where: { id: data.id, userId: user.id },
    });
  } catch (error) {
    console.error("Error deleting note:", error);
    throw new Error("Failed to delete note.");
  }
}

export async function toggleFavorite(id: string) {
  const user = await getAuthenticatedUser();

  try {
    // First get the current note to check its favorite status
    const note = await db.note.findUnique({
      where: { id, userId: user.id },
      select: { isFavorite: true },
    });

    if (!note) {
      throw new Error("Note not found.");
    }

    // Toggle the favorite status
    const updatedNote = await db.note.update({
      where: { id, userId: user.id },
      data: { isFavorite: !note.isFavorite },
      include: {
        folder: true,
        tags: true,
      },
    });

    return updatedNote;
  } catch (error) {
    console.error("Error toggling favorite status:", error);
    throw new Error("Failed to toggle favorite status.");
  }
}
