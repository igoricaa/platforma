'use client';

import { createAuthClient } from 'better-auth/react';

// Create a Better Auth client
export const authClient = createAuthClient({
  baseURL: '/api/auth', // The base URL for your auth API routes
});

// Export the auth client hooks and methods
export const {
  useSession,
  getSession,
  signIn,
  signOut,
  signUp,
} = authClient; 