"use server";

// Re-export query functions by directly re-declaring them as server functions
export async function getTags() {
  return (await import("./tags/queries")).getTags();
}

// Re-export mutation functions by directly re-declaring them as server functions
export async function createTag(data: { name: string }) {
  return (await import("./tags/mutations")).createTag(data);
}

export async function updateTag(id: string, data: { name: string }) {
  return (await import("./tags/mutations")).updateTag(id, data);
}

export async function deleteTag(data: { id: string }) {
  return (await import("./tags/mutations")).deleteTag(data);
}

// Re-export note-tag relationship functions
export async function addTagToNote(data: { id: string; tagId: string }) {
  return (await import("./tags/note-tags")).addTagToNote(data);
}

export async function removeTagFromNote(data: { id: string; tagId: string }) {
  return (await import("./tags/note-tags")).removeTagFromNote(data);
}
