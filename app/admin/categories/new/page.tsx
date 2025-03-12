export const dynamic = 'force-dynamic';

import { db } from '@/db';
import { categories } from '@/db/schema';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

export default async function NewCategoryPage() {
  async function createCategory(formData: FormData) {
    'use server';
    
    const name = formData.get('name') as string;
    const description = formData.get('description') as string;
    const icon = formData.get('icon') as string;
    
    // Insert the new category
    await db.insert(categories).values({
      name,
      description,
      icon,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    
    // Revalidate the categories page
    revalidatePath('/admin/categories');
    
    // Redirect back to the categories list
    redirect('/admin/categories');
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Add New Category</h1>
        <Link 
          href="/admin/categories" 
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
        >
          Cancel
        </Link>
      </div>
      
      <div className="bg-white rounded-lg shadow p-6">
        <form action={createCategory} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Category Name
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
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              rows={4}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            ></textarea>
          </div>
          
          <div>
            <label htmlFor="icon" className="block text-sm font-medium text-gray-700">
              Icon (Font Awesome class or URL)
            </label>
            <input
              type="text"
              id="icon"
              name="icon"
              required
              placeholder="fa-solid fa-dumbbell"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
            <p className="mt-1 text-sm text-gray-500">Enter a Font Awesome class (e.g., fa-solid fa-dumbbell) or an icon URL</p>
          </div>
          
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Create Category
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 