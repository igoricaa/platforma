// Replace force-dynamic with fetchCache
export const fetchCache = 'default-no-store';

import { db } from '@/db';
import { purchases, subscriptions } from '@/db/schema';
import { desc } from 'drizzle-orm';
import { Suspense } from 'react';

// Component to handle data fetching with error handling
async function PaymentsList() {
  try {
    // Fetch all purchases with related user and course data
    const allPurchases = await db.query.purchases.findMany({
      with: {
        user: true,
        course: true,
      },
      orderBy: (purchases, { desc }) => [desc(purchases.purchaseDate)],
    });

    // Fetch all subscriptions with related user and coach data
    const allSubscriptions = await db.query.subscriptions.findMany({
      with: {
        user: true,
        coach: true,
      },
      orderBy: (subscriptions, { desc }) => [desc(subscriptions.startDate)],
    });

    return (
      <div>
        <h1 className="text-2xl font-bold mb-6">Payment Management</h1>
        
        {/* Course Purchases Section */}
        <div className="mb-10">
          <h2 className="text-xl font-semibold mb-4">Course Purchases</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-lg shadow">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stripe ID</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {allPurchases.map((purchase) => (
                  <tr key={purchase.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{purchase.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{purchase.user.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{purchase.course.title}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${(purchase.amount / 100).toFixed(2)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(purchase.purchaseDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {purchase.stripePaymentIntentId || 'N/A'}
                    </td>
                  </tr>
                ))}
                {allPurchases.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-6 py-4 text-center text-sm text-gray-500">
                      No purchases found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        
        {/* Subscriptions Section */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Subscriptions</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-lg shadow">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Coach</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Start Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">End Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stripe ID</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {allSubscriptions.map((subscription) => (
                  <tr key={subscription.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{subscription.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{subscription.user.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{subscription.coach.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        subscription.status === 'active' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {subscription.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(subscription.startDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {subscription.endDate ? new Date(subscription.endDate).toLocaleDateString() : 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {subscription.stripeSubscriptionId || 'N/A'}
                    </td>
                  </tr>
                ))}
                {allSubscriptions.length === 0 && (
                  <tr>
                    <td colSpan={7} className="px-6 py-4 text-center text-sm text-gray-500">
                      No subscriptions found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    // If there's an error during build time, we'll show a fallback UI
    return (
      <div className="bg-white shadow rounded-lg p-6">
        <p className="text-center text-gray-500">Loading payment data...</p>
      </div>
    );
  }
}

export default function PaymentsPage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Payment History</h1>
      </div>
      
      <Suspense fallback={
        <div className="bg-white shadow rounded-lg p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-full"></div>
          </div>
        </div>
      }>
        <PaymentsList />
      </Suspense>
    </div>
  );
} 