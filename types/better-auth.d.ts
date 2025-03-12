import 'better-auth/react';

declare module 'better-auth/react' {
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      emailVerified: boolean;
      createdAt: Date;
      updatedAt: Date;
      image?: string | null;
      role: 'admin' | 'user' | 'coach';
    };
    session: {
      id: string;
      createdAt: Date;
      updatedAt: Date;
      expiresAt: Date;
      userId: string;
      userAgent?: string;
      ip?: string;
    };
  }
} 