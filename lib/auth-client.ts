'use client';

import { inferAdditionalFields } from 'better-auth/client/plugins';
import { createAuthClient } from 'better-auth/react';
import { auth } from './auth';

// Create a Better Auth client
export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000',
  plugins: [inferAdditionalFields<typeof auth>()],
});

// Export the auth client hooks and methods
export const { useSession, getSession, signIn, signOut, signUp } = authClient;
