/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import type { QuizData } from "./types/quiz";

// Re-export types
export type { QuizQuestion, QuizData } from "./types/quiz";
export type {
  NodeData,
  NodePosition,
  NodeStyle,
  Node,
  EdgeStyle,
  EdgeLabelStyle,
  EdgeBgStyle,
  EdgeData,
  Edge,
  Viewport,
  MindMapData,
} from "./types/mind-map";

// Re-export query functions as server functions
export async function getNotes() {
  return (await import("./notes/queries")).getNotes();
}

export async function getNote(id: string) {
  return (await import("./notes/queries")).getNote(id);
}

export async function getNotesByFolder(folderId: string) {
  return (await import("./notes/queries")).getNotesByFolder(folderId);
}

export async function getNotesByTag(tagId: string) {
  return (await import("./notes/queries")).getNotesByTag(tagId);
}

export async function getFavoriteNotes() {
  return (await import("./notes/queries")).getFavoriteNotes();
}

// Re-export mutation functions as server functions
export async function createNote(data: {
  title: string;
  content: string;
  folderId: string;
  summary?: string;
  qa?: QuizData;
  mindMap?: any;
  isFavorite?: boolean;
}) {
  return (await import("./notes/mutations")).createNote(data);
}

export async function updateNote(
  id: string,
  data: {
    title?: string;
    content?: string;
    folderId?: string;
    summary?: string;
    qa?: QuizData;
    mindMap?: any;
    isFavorite?: boolean;
  },
) {
  return (await import("./notes/mutations")).updateNote(id, data);
}

export async function deleteNote(data: { id: string }) {
  return (await import("./notes/mutations")).deleteNote(data);
}

export async function toggleFavorite(id: string) {
  return (await import("./notes/mutations")).toggleFavorite(id);
}

export async function getRecentNotes() {
  return (await import("./notes/queries")).getRecentNotes();
}
