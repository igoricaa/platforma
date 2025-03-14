import { ReactNode } from 'react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { db } from '@/db';
import { users } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { Suspense } from 'react';

// Use fetchCache instead of force-dynamic
export const fetchCache = 'default-no-store';

interface AdminLayoutProps {
  children: ReactNode;
}

// Component to handle admin authentication
async function AdminAuth({ children }: { children: ReactNode }) {
  try {
    // For now, we'll just check if there are any admin users
    // In a real app, you would check if the current user is an admin
    const adminUsers = await db.query.users.findMany({
      where: eq(users.role, 'admin'),
    });

    // If no admin users found, redirect to sign-in
    if (adminUsers.length === 0) {
      redirect('/sign-in');
    }

    // For simplicity, we'll use the first admin user
    const adminUser = adminUsers[0];

    return (
      <>
        <header className='bg-white shadow p-4'>
          <div className='flex justify-between items-center'>
            <h2 className='text-xl font-semibold'>Admin Panel</h2>
            <div className='flex items-center space-x-4'>
              <span>{adminUser.name}</span>
              <Link
                href='/api/auth/signout'
                className='text-red-600 hover:text-red-800'
              >
                Sign Out
              </Link>
            </div>
          </div>
        </header>
        <main className='p-6'>{children}</main>
      </>
    );
  } catch (error) {
    // If there's an error during build time, we'll show a fallback UI
    redirect('/sign-in');

    return (
      <>
        <header className='bg-white shadow p-4'>
          <div className='flex justify-between items-center'>
            <h2 className='text-xl font-semibold'>Admin Panel</h2>
            <div className='flex items-center space-x-4'>
              <span>Loading...</span>
            </div>
          </div>
        </header>
        <main className='p-6'>{children}</main>
      </>
    );
  }
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className='flex h-screen'>
      {/* Sidebar */}
      <div className='w-64 bg-gray-900 text-white p-4'>
        <h1 className='text-2xl font-bold mb-8'>Admin Dashboard</h1>
        <nav className='space-y-2'>
          <Link
            href='/admin/users'
            className='block py-2 px-4 rounded hover:bg-gray-800'
          >
            Users
          </Link>
          <Link
            href='/admin/coaches'
            className='block py-2 px-4 rounded hover:bg-gray-800'
          >
            Coaches
          </Link>
          <Link
            href='/admin/courses'
            className='block py-2 px-4 rounded hover:bg-gray-800'
          >
            Courses
          </Link>
          <Link
            href='/admin/categories'
            className='block py-2 px-4 rounded hover:bg-gray-800'
          >
            Categories
          </Link>
          <Link
            href='/admin/analytics'
            className='block py-2 px-4 rounded hover:bg-gray-800'
          >
            Analytics
          </Link>
          <Link
            href='/admin/payments'
            className='block py-2 px-4 rounded hover:bg-gray-800'
          >
            Payments
          </Link>
        </nav>
      </div>

      {/* Main content */}
      <div className='flex-1 overflow-auto'>
        <Suspense
          fallback={
            <div>
              <header className='bg-white shadow p-4'>
                <div className='flex justify-between items-center'>
                  <h2 className='text-xl font-semibold'>Admin Panel</h2>
                  <div className='flex items-center space-x-4'>
                    <span>Loading...</span>
                  </div>
                </div>
              </header>
              <main className='p-6'>
                <div className='animate-pulse'>
                  <div className='h-8 bg-gray-200 rounded w-1/4 mb-6'></div>
                  <div className='h-64 bg-gray-200 rounded mb-4'></div>
                </div>
              </main>
            </div>
          }
        >
          <AdminAuth>{children}</AdminAuth>
        </Suspense>
      </div>
    </div>
  );
}
