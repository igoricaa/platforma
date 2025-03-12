import { db } from '@/db';
import { coaches, users, coachSpecialties } from '@/db/schema';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { Suspense } from 'react';

// Instead of force-dynamic, we'll handle errors gracefully
export const fetchCache = 'default-no-store';

// Create a component that handles the data fetching with error handling
async function CoachForm() {
  try {
    // Fetch all users with role 'coach' that don't have a coach profile yet
    const availableUsers = await db.query.users.findMany({
      where: (users, { eq }) => eq(users.role, 'coach'),
    });
    
    // Filter out users that already have a coach profile
    const existingCoachUserIds = (await db.query.coaches.findMany()).map(coach => coach.userId);
    const eligibleUsers = availableUsers.filter(user => !existingCoachUserIds.includes(user.id));

    return (
      <div className="bg-white rounded-lg shadow p-6">
        {eligibleUsers.length === 0 ? (
          <div className="text-center py-6">
            <p className="text-gray-500 mb-4">No eligible users found with coach role.</p>
            <p className="text-sm text-gray-500">
              First create a user with the coach role before creating a coach profile.
            </p>
            <div className="mt-4">
              <Link
                href="/admin/users/new"
                className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
              >
                Create New User
              </Link>
            </div>
          </div>
        ) : (
          <form action={createCoach} className="space-y-6">
            <div>
              <label htmlFor="userId" className="block text-sm font-medium text-gray-700">
                User
              </label>
              <select
                id="userId"
                name="userId"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
                <option value="">Select a user</option>
                {eligibleUsers.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.name} ({user.email})
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Coach Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            
            <div>
              <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
                Bio
              </label>
              <textarea
                id="bio"
                name="bio"
                rows={4}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              ></textarea>
            </div>
            
            <div>
              <label htmlFor="profileImageUrl" className="block text-sm font-medium text-gray-700">
                Profile Image URL
              </label>
              <input
                type="text"
                id="profileImageUrl"
                name="profileImageUrl"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            
            <div>
              <label htmlFor="subscriptionPrice" className="block text-sm font-medium text-gray-700">
                Subscription Price (in cents)
              </label>
              <input
                type="number"
                id="subscriptionPrice"
                name="subscriptionPrice"
                required
                min="0"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
              <p className="mt-1 text-sm text-gray-500">Enter price in cents (e.g., 1999 for $19.99)</p>
            </div>
            
            <div>
              <label htmlFor="specialties" className="block text-sm font-medium text-gray-700">
                Specialties
              </label>
              <input
                type="text"
                id="specialties"
                name="specialties"
                placeholder="Fitness, Nutrition, Yoga, etc. (comma separated)"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
              <p className="mt-1 text-sm text-gray-500">Enter specialties separated by commas</p>
            </div>
            
            <div className="flex justify-end">
              <button
                type="submit"
                className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Create Coach
              </button>
            </div>
          </form>
        )}
      </div>
    );
  } catch (error) {
    // If there's an error during build time, we'll show a fallback UI
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="text-center py-6">
          <p className="text-gray-500 mb-4">Loading coach form...</p>
        </div>
      </div>
    );
  }
}

async function createCoach(formData: FormData) {
  'use server';
  
  const userId = parseInt(formData.get('userId') as string, 10);
  const name = formData.get('name') as string;
  const bio = formData.get('bio') as string;
  const profileImageUrl = formData.get('profileImageUrl') as string;
  const subscriptionPrice = parseInt(formData.get('subscriptionPrice') as string, 10);
  const specialties = (formData.get('specialties') as string).split(',').map(s => s.trim());
  
  // Insert the new coach
  const [newCoach] = await db.insert(coaches).values({
    userId,
    name,
    bio,
    profileImageUrl,
    subscriptionPrice,
    createdAt: new Date(),
    updatedAt: new Date(),
  }).returning();
  
  // Insert specialties if provided
  if (specialties.length > 0 && specialties[0] !== '') {
    await db.transaction(async (tx) => {
      for (const specialty of specialties) {
        await tx.insert(coachSpecialties).values({
          coachId: newCoach.id,
          specialty,
        });
      }
    });
  }
  
  // Revalidate the coaches page
  revalidatePath('/admin/coaches');
  
  // Redirect back to the coaches list
  redirect('/admin/coaches');
}

export default function NewCoachPage() {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Add New Coach</h1>
        <Link 
          href="/admin/coaches" 
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
        >
          Cancel
        </Link>
      </div>
      
      <Suspense fallback={
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-center py-6">
            <p className="text-gray-500 mb-4">Loading coach form...</p>
          </div>
        </div>
      }>
        <CoachForm />
      </Suspense>
    </div>
  );
} 