import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { db } from '../db';
import { nextCookies } from 'better-auth/next-js';

export const auth = betterAuth({
  appName: 'Platforma',
  database: drizzleAdapter(db, {
    provider: 'pg',
    usePlural: true,
  }),
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 8,
    maxPasswordLength: 128,
    autoSignIn: true,
  },
  user: {
    modelName: 'users',
    additionalFields: {
      role: {
        type: 'string',
        required: false,
        defaultValue: 'user',
        input: false,
      },
    },
  },
  plugins: [nextCookies()], // make sure this is the last plugin in the array
  // advanced: {
  //   useSecureCookies: process.env.NODE_ENV === 'production',
  // },
  // Enable two-factor authentication if needed
  twoFactor: {
    enabled: false, // Set to true when you're ready to use it
  },
  // Enable organization support if needed
  organization: {
    enabled: false, // Set to true when you're ready to use it
  },
});
