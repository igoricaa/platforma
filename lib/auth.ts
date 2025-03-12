import { betterAuth } from 'better-auth';
import { Pool } from '@neondatabase/serverless';
import { db } from '../db';
import { users, userRoleEnum } from '../db/schema';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcrypt';

// Create a Better Auth instance
export const auth = betterAuth({
  database: new Pool({
    connectionString: process.env.POSTGRES_URL || '',
  }),
  emailAndPassword: {
    enabled: true,
    // Custom handlers for user operations
    handlers: {
      // Custom handler for creating a user
      createUser: async ({
        email,
        password,
        name,
        role = 'user',
      }: {
        email: string;
        password: string;
        name: string;
        role: string;
      }) => {
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the user in the database
        const [newUser] = await db
          .insert(users)
          .values({
            email,
            password: hashedPassword,
            name,
            role: role as 'admin' | 'user' | 'coach',
          })
          .returning();

        return {
          id: newUser.id.toString(),
          email: newUser.email,
          name: newUser.name,
          role: newUser.role,
        };
      },
      // Custom handler for getting a user by email
      getUserByEmail: async ({ email }: { email: string }) => {
        const user = await db.query.users.findFirst({
          where: eq(users.email, email),
        });

        if (!user) return null;

        return {
          id: user.id.toString(),
          email: user.email,
          name: user.name,
          role: user.role,
          password: user.password,
        };
      },
      // Custom handler for verifying a password
      verifyPassword: async ({
        password,
        hash,
      }: {
        password: string;
        hash: string;
      }) => {
        return bcrypt.compare(password, hash);
      },
    },
  },
  // TODO: add social providers - https://www.better-auth.com/docs/installation#authentication-methods
  // Add two-factor authentication
  twoFactor: {
    enabled: true,
  },
  // Add organization support
  organization: {
    enabled: true,
  },
});
