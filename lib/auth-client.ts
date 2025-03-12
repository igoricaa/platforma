'use client';

import { createAuthClient } from 'better-auth/react';

// Create a Better Auth client
export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
});

// Export the auth client hooks and methods
export const { useSession, getSession, signIn, signOut, signUp } = authClient;
