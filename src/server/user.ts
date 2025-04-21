"use server";

import { auth } from "./auth";

// Helper function to check authentication
export async function getAuthenticatedUser() {
  const session = await auth();
  if (!session?.user) {
    throw new Error("Not authenticated.");
  }
  return session.user;
}
