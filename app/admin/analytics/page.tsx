// Replace force-dynamic with fetchCache
export const fetchCache = 'default-no-store';

import { db } from '@/db';
import { users, coaches, courses, purchases, subscriptions } from '@/db/schema';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, BookOpen, DollarSign, Users } from 'lucide-react';
import { Suspense } from 'react';

// Component to handle data fetching with error handling
async function AnalyticsDashboard() {
  try {
    // Get counts from the database
    const userCount = await db.select({ count: users.id }).from(users);
    const coachCount = await db.select({ count: coaches.id }).from(coaches);
    const courseCount = await db.select({ count: courses.id }).from(courses);
    
    // Calculate total revenue from purchases
    const purchaseRevenue = await db.select({
      total: purchases.amount
    }).from(purchases);
    
    // Get all coaches to calculate subscription revenue
    const allCoaches = await db.query.coaches.findMany();
    const activeSubscriptions = await db.query.subscriptions.findMany({
      where: (subscriptions, { eq }) => eq(subscriptions.status, 'active'),
    });
    
    // Calculate subscription revenue based on coach subscription prices
    const subscriptionRevenue = activeSubscriptions.reduce((total, subscription) => {
      const coach = allCoaches.find(c => c.id === subscription.coachId);
      return total + (coach?.subscriptionPrice || 0);
    }, 0);
    
    // Calculate total revenue
    const totalRevenue = purchaseRevenue.reduce((acc, curr) => acc + curr.total, 0) + subscriptionRevenue;
    
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userCount[0]?.count || 0}</div>
            <p className="text-xs text-muted-foreground">Registered users on the platform</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Coaches</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{coachCount[0]?.count || 0}</div>
            <p className="text-xs text-muted-foreground">Active coaches on the platform</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Courses</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{courseCount[0]?.count || 0}</div>
            <p className="text-xs text-muted-foreground">Available courses</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${(totalRevenue / 100).toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">Lifetime revenue</p>
          </CardContent>
        </Card>
      </div>
    );
  } catch (error) {
    // If there's an error during build time, we'll show a fallback UI
    return (
      <div className="bg-white shadow rounded-lg p-6">
        <p className="text-center text-gray-500">Loading analytics data...</p>
      </div>
    );
  }
}

export default function AnalyticsPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Analytics Dashboard</h1>
      
      <Suspense fallback={
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white shadow rounded-lg p-6">
              <div className="animate-pulse space-y-4">
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                <div className="h-8 bg-gray-200 rounded w-1/4"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              </div>
            </div>
          ))}
        </div>
      }>
        <AnalyticsDashboard />
      </Suspense>
    </div>
  );
} 