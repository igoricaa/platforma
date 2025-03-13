export const dynamic = 'force-dynamic';

import { db } from '@/db';
import { users } from '@/db/schema';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { hash } from 'bcryptjs';
import { nanoid } from 'nanoid';

export default async function NewUserPage() {
  async function createUser(formData: FormData) {
    'use server';

    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const name = formData.get('name') as string;
    const role = formData.get('role') as 'admin' | 'user' | 'coach';

    // TODO: create account for this user..

    // Hash the password
    const hashedPassword = await hash(password, 10);

    // Insert the new user
    await db.insert(users).values({
      id: nanoid(),
      email,
      name,
      role,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // Revalidate the users page
    revalidatePath('/admin/users');

    // Redirect back to the users list
    redirect('/admin/users');
  }

  return (
    <div>
      <div className='flex justify-between items-center mb-6'>
        <h1 className='text-2xl font-bold'>Add New User</h1>
        <Link
          href='/admin/users'
          className='px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300'
        >
          Cancel
        </Link>
      </div>

      <div className='bg-white rounded-lg shadow p-6'>
        <form action={createUser} className='space-y-6'>
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
              required
              className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500'
            />
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
              Create User
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
