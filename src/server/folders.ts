"use server";

// Re-export query functions by directly re-declaring them as server functions
export async function getFolders() {
  return (await import("./folders/queries")).getFolders();
}

export async function getFolder(id: string) {
  return (await import("./folders/queries")).getFolder(id);
}

// Re-export mutation functions by directly re-declaring them as server functions
export async function createFolder(data: { name: string }) {
  return (await import("./folders/mutations")).createFolder(data);
}

export async function updateFolder(id: string, data: { name: string }) {
  return (await import("./folders/mutations")).updateFolder(id, data);
}

export async function deleteFolder(data: { id: string }) {
  return (await import("./folders/mutations")).deleteFolder(data);
}
