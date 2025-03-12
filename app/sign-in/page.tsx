import { Suspense } from 'react';
import { redirect } from 'next/navigation';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { SignInForm } from '@/components/auth/sign-in-form';

export default async function SignInPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (session && session.user) {
    redirect('/dashboard');
  }

  return (
    <Suspense
      fallback={
        <div className='flex items-center justify-center min-h-screen bg-gray-50'>
          <Card className='w-full max-w-md'>
            <CardHeader className='space-y-1'>
              <CardTitle className='text-2xl font-bold'>Sign in</CardTitle>
              <CardDescription>Loading...</CardDescription>
            </CardHeader>
            <CardContent>
              <div className='animate-pulse space-y-4'>
                <div className='h-4 bg-gray-200 rounded w-3/4'></div>
                <div className='h-10 bg-gray-200 rounded'></div>
                <div className='h-4 bg-gray-200 rounded w-1/2'></div>
                <div className='h-10 bg-gray-200 rounded'></div>
                <div className='h-10 bg-gray-200 rounded'></div>
              </div>
            </CardContent>
          </Card>
        </div>
      }
    >
      <SignInForm />
    </Suspense>
  );
}
