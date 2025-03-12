// Add dynamic rendering to the top of the file
export const dynamic = 'force-dynamic';

import { db } from '@/db';
import { users, courses, purchases, subscriptions } from '@/db/schema';
import { count, eq } from 'drizzle-orm';

export default async function AnalyticsPage() {
  // Get total users count
  const [{ value: totalUsers }] = await db
    .select({ value: count() })
    .from(users);

  // Get total courses count
  const [{ value: totalCourses }] = await db
    .select({ value: count() })
    .from(courses);

  // Get total purchases count
  const [{ value: totalPurchases }] = await db
    .select({ value: count() })
    .from(purchases);

  // Get total active subscriptions count
  const [{ value: totalActiveSubscriptions }] = await db
    .select({ value: count() })
    .from(subscriptions)
    .where(eq(subscriptions.status, 'active'));

  // Get total revenue from purchases
  const purchaseRevenue = await db
    .select({ amount: purchases.amount })
    .from(purchases);
  
  const totalPurchaseRevenue = purchaseRevenue.reduce((sum, purchase) => sum + purchase.amount, 0);

  // Get recent purchases
  const recentPurchases = await db.query.purchases.findMany({
    with: {
      user: true,
      course: true,
    },
    orderBy: (purchases, { desc }) => [desc(purchases.purchaseDate)],
    limit: 5,
  });

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Platform Analytics</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Stats Cards */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-sm font-medium text-gray-500 uppercase">Total Users</h2>
          <p className="mt-2 text-3xl font-bold text-gray-900">{totalUsers}</p>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-sm font-medium text-gray-500 uppercase">Total Courses</h2>
          <p className="mt-2 text-3xl font-bold text-gray-900">{totalCourses}</p>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-sm font-medium text-gray-500 uppercase">Total Purchases</h2>
          <p className="mt-2 text-3xl font-bold text-gray-900">{totalPurchases}</p>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-sm font-medium text-gray-500 uppercase">Active Subscriptions</h2>
          <p className="mt-2 text-3xl font-bold text-gray-900">{totalActiveSubscriptions}</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Card */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Revenue Overview</h2>
          <div className="flex items-baseline">
            <p className="text-4xl font-bold text-gray-900">${(totalPurchaseRevenue / 100).toFixed(2)}</p>
            <p className="ml-2 text-sm text-gray-500">total revenue</p>
          </div>
          <p className="mt-1 text-sm text-gray-500">From {totalPurchases} course purchases</p>
        </div>
        
        {/* Recent Purchases */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Recent Purchases</h2>
          <div className="space-y-4">
            {recentPurchases.map((purchase) => (
              <div key={purchase.id} className="flex justify-between items-center">
                <div>
                  <p className="font-medium text-gray-900">{purchase.course.title}</p>
                  <p className="text-sm text-gray-500">by {purchase.user.name}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-900">${(purchase.amount / 100).toFixed(2)}</p>
                  <p className="text-sm text-gray-500">{new Date(purchase.purchaseDate).toLocaleDateString()}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 