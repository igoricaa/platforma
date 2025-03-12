'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Home, 
  BookOpen, 
  Users, 
  Settings, 
  CreditCard, 
  BarChart, 
  PlusCircle,
  Dumbbell
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useUser } from '@clerk/nextjs';

const coachRoutes = [
  {
    label: 'Dashboard',
    icon: Home,
    href: '/dashboard',
  },
  {
    label: 'My Courses',
    icon: BookOpen,
    href: '/dashboard/courses',
  },
  {
    label: 'Students',
    icon: Users,
    href: '/dashboard/students',
  },
  {
    label: 'Analytics',
    icon: BarChart,
    href: '/dashboard/analytics',
  },
  {
    label: 'Payments',
    icon: CreditCard,
    href: '/dashboard/payments',
  },
  {
    label: 'Settings',
    icon: Settings,
    href: '/dashboard/settings',
  },
];

const userRoutes = [
  {
    label: 'Dashboard',
    icon: Home,
    href: '/dashboard',
  },
  {
    label: 'My Courses',
    icon: BookOpen,
    href: '/dashboard/my-courses',
  },
  {
    label: 'Coaches',
    icon: Dumbbell,
    href: '/dashboard/coaches',
  },
  {
    label: 'Subscriptions',
    icon: CreditCard,
    href: '/dashboard/subscriptions',
  },
  {
    label: 'Settings',
    icon: Settings,
    href: '/dashboard/settings',
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const { user } = useUser();
  
  // This is a placeholder - in a real app, you'd check the user's role from your database
  const isCoach = user?.publicMetadata?.role === 'coach';
  
  const routes = isCoach ? coachRoutes : userRoutes;

  return (
    <div className="h-full border-r bg-background w-64 flex-shrink-0">
      <div className="p-6">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl">
          S&C Platform
        </Link>
      </div>
      <div className="flex flex-col p-3 space-y-1">
        {routes.map((route) => (
          <Button
            key={route.href}
            variant={pathname === route.href ? 'secondary' : 'ghost'}
            className={cn(
              'justify-start',
              pathname === route.href ? 'bg-secondary' : ''
            )}
            asChild
          >
            <Link href={route.href}>
              <route.icon className="h-4 w-4 mr-2" />
              {route.label}
            </Link>
          </Button>
        ))}
      </div>
      {isCoach && (
        <div className="p-3 mt-auto">
          <Button className="w-full justify-start" asChild>
            <Link href="/dashboard/courses/new">
              <PlusCircle className="h-4 w-4 mr-2" />
              Create Course
            </Link>
          </Button>
        </div>
      )}
    </div>
  );
} 