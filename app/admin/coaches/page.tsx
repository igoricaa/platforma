// Replace force-dynamic with fetchCache
export const fetchCache = 'default-no-store';

import { db } from '@/db';
import { coaches } from '@/db/schema';
import Link from 'next/link';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { eq } from 'drizzle-orm';
import { Suspense } from 'react';

// Server action for deleting a coach
async function deleteCoach(formData: FormData) {
  'use server';

  const coachId = formData.get('coachId') as string;

  // Delete the coach
  await db.delete(coaches).where(eq(coaches.id, coachId));

  // Revalidate the page
  revalidatePath('/admin/coaches');

  // Redirect back to the same page
  redirect('/admin/coaches');
}

// Component to handle data fetching with error handling
async function CoachesList() {
  try {
    // Fetch all coaches with their related user
    const allCoaches = await db.query.coaches.findMany({
      with: {
        user: true,
        specialties: true,
      },
      orderBy: (coaches, { asc }) => [asc(coaches.name)],
    });

    return (
      <div className='bg-white rounded-lg shadow overflow-hidden'>
        <table className='min-w-full divide-y divide-gray-200'>
          <thead className='bg-gray-50'>
            <tr>
              <th
                scope='col'
                className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
              >
                ID
              </th>
              <th
                scope='col'
                className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
              >
                Name
              </th>
              <th
                scope='col'
                className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
              >
                User Email
              </th>
              <th
                scope='col'
                className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
              >
                Specialties
              </th>
              <th
                scope='col'
                className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
              >
                Subscription Price
              </th>
              <th
                scope='col'
                className='px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider'
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody className='bg-white divide-y divide-gray-200'>
            {allCoaches.map((coach) => (
              <tr key={coach.id}>
                <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>
                  {coach.id}
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                  {coach.name}
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                  {coach.user.email}
                </td>
                <td className='px-6 py-4 text-sm text-gray-500'>
                  {coach.specialties.map((s) => s.specialty).join(', ') ||
                    'None'}
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                  ${(coach.subscriptionPrice / 100).toFixed(2)}/month
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-right text-sm font-medium'>
                  <div className='flex justify-end space-x-2'>
                    <Link
                      href={`/admin/coaches/${coach.id}/edit`}
                      className='text-indigo-600 hover:text-indigo-900'
                    >
                      Edit
                    </Link>
                    <form action={deleteCoach}>
                      <input type='hidden' name='coachId' value={coach.id} />
                      <button
                        type='submit'
                        className='text-red-600 hover:text-red-900'
                        onClick={(e) => {
                          if (
                            !confirm(
                              'Are you sure you want to delete this coach?'
                            )
                          ) {
                            e.preventDefault();
                          }
                        }}
                      >
                        Delete
                      </button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
            {allCoaches.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  className='px-6 py-4 text-center text-sm text-gray-500'
                >
                  No coaches found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  } catch (error) {
    // If there's an error during build time, we'll show a fallback UI
    return (
      <div className='bg-white rounded-lg shadow p-6'>
        <p className='text-center text-gray-500'>Loading coach data...</p>
      </div>
    );
  }
}

export default function CoachesPage() {
  return (
    <div>
      <div className='flex justify-between items-center mb-6'>
        <h1 className='text-2xl font-bold'>Coaches</h1>
        <Link
          href='/admin/coaches/new'
          className='px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700'
        >
          Add New Coach
        </Link>
      </div>

      <Suspense
        fallback={
          <div className='bg-white rounded-lg shadow p-6'>
            <div className='animate-pulse space-y-4'>
              <div className='h-4 bg-gray-200 rounded w-1/4'></div>
              <div className='h-4 bg-gray-200 rounded w-full'></div>
              <div className='h-4 bg-gray-200 rounded w-full'></div>
              <div className='h-4 bg-gray-200 rounded w-full'></div>
            </div>
          </div>
        }
      >
        <CoachesList />
      </Suspense>
    </div>
  );
}
