import { db } from '@/db';
import { coaches, categories, courses } from '@/db/schema';
import { eq } from 'drizzle-orm';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { Suspense } from 'react';

// Replace dynamic rendering with fetchCache
export const fetchCache = 'default-no-store';

// Server action to update a course
async function updateCourse(courseId: number, formData: FormData) {
  'use server';

  const title = formData.get('title') as string;
  const description = formData.get('description') as string;
  const thumbnailUrl = formData.get('thumbnailUrl') as string;
  const price = parseInt(formData.get('price') as string, 10);
  const coachId = formData.get('coachId') as string;
  const categoryId = parseInt(formData.get('categoryId') as string, 10);

  // Update the course
  await db
    .update(courses)
    .set({
      title,
      description,
      thumbnailUrl,
      price,
      coachId,
      categoryId,
      updatedAt: new Date(),
    })
    .where(eq(courses.id, courseId));

  // Revalidate the courses page
  revalidatePath('/admin/courses');

  // Redirect back to the courses list
  redirect('/admin/courses');
}

// Component to fetch data and render the form
async function CourseEditForm({ courseId }: { courseId: number }) {
  // Fetch the course to edit
  const course = await db.query.courses.findFirst({
    where: eq(courses.id, courseId),
  });

  if (!course) {
    redirect('/admin/courses');
  }

  // Fetch all coaches for the dropdown
  const allCoaches = await db.query.coaches.findMany({
    orderBy: (coaches, { asc }) => [asc(coaches.name)],
  });

  // Fetch all categories for the dropdown
  const allCategories = await db.query.categories.findMany({
    orderBy: (categories, { asc }) => [asc(categories.name)],
  });

  const handleUpdateCourse = updateCourse.bind(null, courseId);

  return (
    <div className='bg-white rounded-lg shadow p-6'>
      <form action={handleUpdateCourse} className='space-y-6'>
        <div>
          <label
            htmlFor='title'
            className='block text-sm font-medium text-gray-700'
          >
            Course Title
          </label>
          <input
            type='text'
            id='title'
            name='title'
            defaultValue={course.title}
            required
            className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500'
          />
        </div>

        <div>
          <label
            htmlFor='description'
            className='block text-sm font-medium text-gray-700'
          >
            Description
          </label>
          <textarea
            id='description'
            name='description'
            rows={4}
            defaultValue={course.description}
            required
            className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500'
          ></textarea>
        </div>

        <div>
          <label
            htmlFor='thumbnailUrl'
            className='block text-sm font-medium text-gray-700'
          >
            Thumbnail URL
          </label>
          <input
            type='text'
            id='thumbnailUrl'
            name='thumbnailUrl'
            defaultValue={course.thumbnailUrl}
            required
            className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500'
          />
        </div>

        <div>
          <label
            htmlFor='price'
            className='block text-sm font-medium text-gray-700'
          >
            Price (in cents)
          </label>
          <input
            type='number'
            id='price'
            name='price'
            defaultValue={course.price}
            required
            min='0'
            className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500'
          />
          <p className='mt-1 text-sm text-gray-500'>
            Enter price in cents (e.g., 2999 for $29.99)
          </p>
        </div>

        <div>
          <label
            htmlFor='coachId'
            className='block text-sm font-medium text-gray-700'
          >
            Coach
          </label>
          <select
            id='coachId'
            name='coachId'
            defaultValue={course.coachId}
            required
            className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500'
          >
            <option value=''>Select a coach</option>
            {allCoaches.map((coach) => (
              <option key={coach.id} value={coach.id}>
                {coach.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor='categoryId'
            className='block text-sm font-medium text-gray-700'
          >
            Category
          </label>
          <select
            id='categoryId'
            name='categoryId'
            defaultValue={course.categoryId}
            required
            className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500'
          >
            <option value=''>Select a category</option>
            {allCategories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div className='flex justify-end'>
          <button
            type='submit'
            className='px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
          >
            Update Course
          </button>
        </div>
      </form>
    </div>
  );
}

// Loading fallback component
function CourseFormSkeleton() {
  return (
    <div className='bg-white rounded-lg shadow p-6 animate-pulse'>
      <div className='space-y-6'>
        {[...Array(6)].map((_, i) => (
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

export default async function EditCoursePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const courseId = parseInt(resolvedParams.id, 10);

  return (
    <div>
      <div className='flex justify-between items-center mb-6'>
        <h1 className='text-2xl font-bold'>Edit Course</h1>
        <Link
          href='/admin/courses'
          className='px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300'
        >
          Cancel
        </Link>
      </div>

      <Suspense fallback={<CourseFormSkeleton />}>
        <CourseEditForm courseId={courseId} />
      </Suspense>
    </div>
  );
}
