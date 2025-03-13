import { db } from '@/db';
import { users } from '@/db/schema';
import { eq } from 'drizzle-orm';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { Suspense } from 'react';
import { hash } from 'bcryptjs';

// Replace dynamic rendering with fetchCache
export const fetchCache = 'default-no-store';

// Server action to update a user
async function updateUser(userId: string, formData: FormData) {
  'use server';

  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const name = formData.get('name') as string;
  const role = formData.get('role') as 'admin' | 'user' | 'coach';

  // Prepare update data
  const updateData: any = {
    email,
    name,
    role,
    updatedAt: new Date(),
  };

  // Only update password if provided
  if (password && password.trim() !== '') {
    updateData.password = await hash(password, 10);
  }

  // Update the user
  await db.update(users).set(updateData).where(eq(users.id, userId));

  // Revalidate the users page
  revalidatePath('/admin/users');

  // Redirect back to the users list
  redirect('/admin/users');
}

// Component to fetch data and render the form
async function UserEditForm({ userId }: { userId: string }) {
  // Fetch the user to edit
  const user = await db.query.users.findFirst({
    where: eq(users.id, userId),
  });

  if (!user) {
    redirect('/admin/users');
  }

  const handleUpdateUser = updateUser.bind(null, userId);

  return (
    <div className='bg-white rounded-lg shadow p-6'>
      <form action={handleUpdateUser} className='space-y-6'>
        <div>
          <label
            htmlFor='email'
            className='block text-sm font-medium text-gray-700'
          >
            Email
          </label>
          <input
            type='email'
            id='email'
            name='email'
            defaultValue={user.email}
            required
            className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500'
          />
        </div>

        <div>
          <label
            htmlFor='password'
            className='block text-sm font-medium text-gray-700'
          >
            Password
          </label>
          <input
            type='password'
            id='password'
            name='password'
            placeholder='Leave blank to keep current password'
            className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500'
          />
          <p className='mt-1 text-sm text-gray-500'>
            Leave blank to keep current password
          </p>
        </div>

        <div>
          <label
            htmlFor='name'
            className='block text-sm font-medium text-gray-700'
          >
            Name
          </label>
          <input
            type='text'
            id='name'
            name='name'
            defaultValue={user.name}
            required
            className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500'
          />
        </div>

        <div>
          <label
            htmlFor='role'
            className='block text-sm font-medium text-gray-700'
          >
            Role
          </label>
          <select
            id='role'
            name='role'
            defaultValue={user.role}
            required
            className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500'
          >
            <option value='user'>User</option>
            <option value='coach'>Coach</option>
            <option value='admin'>Admin</option>
          </select>
        </div>

        <div className='flex justify-end'>
          <button
            type='submit'
            className='px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
          >
            Update User
          </button>
        </div>
      </form>
    </div>
  );
}

// Loading fallback component
function UserFormSkeleton() {
  return (
    <div className='bg-white rounded-lg shadow p-6 animate-pulse'>
      <div className='space-y-6'>
        {[...Array(4)].map((_, i) => (
          <div key={i}>
            <div className='h-4 bg-gray-200 rounded w-1/4 mb-2'></div>
            <div className='h-10 bg-gray-200 rounded w-full'></div>
          </div>
        ))}
        <div className='flex justify-end'>
          <div className='h-10 bg-gray-200 rounded w-32'></div>
        </div>
      </div>
    </div>
  );
}

export default async function EditUserPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const userId = resolvedParams.id;

  return (
    <div>
      <div className='flex justify-between items-center mb-6'>
        <h1 className='text-2xl font-bold'>Edit User</h1>
        <Link
          href='/admin/users'
          className='px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300'
        >
          Cancel
        </Link>
      </div>

      <Suspense fallback={<UserFormSkeleton />}>
        <UserEditForm userId={userId} />
      </Suspense>
    </div>
  );
}
