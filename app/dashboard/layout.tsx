// 'use client';

import {  Suspense } from 'react';
import { redirect } from 'next/navigation';
import { Sidebar } from '@/components/dashboard/sidebar';
import { DashboardHeader } from '@/components/dashboard/header';
import { useSession } from '@/lib/auth-client';
import { Loader2 } from 'lucide-react';

function DashboardContent({ children }: { children: React.ReactNode }) {
  // const [isLoading, setIsLoading] = useState(true);
  // const { data: session } = useSession();

  // useEffect(() => {
  //   if (!isLoading && !session) {
  //     redirect('/sign-in');
  //   }
  //   setIsLoading(false);
  // }, [session, isLoading]);

  // if (isLoading) {
  //   return (
  //     <div className="flex items-center justify-center h-screen">
  //       <Loader2 className="h-8 w-8 animate-spin text-primary" />
  //       <span className="ml-2 text-lg">Loading dashboard...</span>
  //     </div>
  //   );
  // }

  return (
    <div className='h-full'>
      <div className='h-full flex'>
        <Sidebar />
        <div className='flex-1 flex flex-col'>
          <DashboardHeader />
          <div className='flex-1 p-6 overflow-y-auto'>{children}</div>
        </div>
      </div>
    </div>
  );
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense
      fallback={
        <div className='flex items-center justify-center h-screen'>
          <Loader2 className='h-8 w-8 animate-spin text-primary' />
          <span className='ml-2 text-lg'>Loading dashboard...</span>
        </div>
      }
    >
      <DashboardContent>{children}</DashboardContent>
    </Suspense>
  );
}
