'use client';

import Link from 'next/link';
import { UserButton, useUser } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
import { usePathname } from 'next/navigation';

export function Navbar() {
  const { isSignedIn } = useUser();
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <nav className="border-b bg-background h-16 fixed w-full z-50">
      <div className="container h-full flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="text-xl font-bold">
            S&C Platform
          </Link>
          <div className="hidden md:flex items-center gap-6">
            <Link
              href="/"
              className={`text-sm ${isActive('/') ? 'font-medium' : 'text-muted-foreground'}`}
            >
              Home
            </Link>
            <Link
              href="/pricing"
              className={`text-sm ${isActive('/pricing') ? 'font-medium' : 'text-muted-foreground'}`}
            >
              Pricing
            </Link>
            <Link
              href="/contact"
              className={`text-sm ${isActive('/contact') ? 'font-medium' : 'text-muted-foreground'}`}
            >
              Contact
            </Link>
          </div>
        </div>
        <div className="flex items-center gap-4">
          {isSignedIn ? (
            <>
              <Button variant="ghost" asChild>
                <Link href="/dashboard">Dashboard</Link>
              </Button>
              <UserButton afterSignOutUrl="/" />
            </>
          ) : (
            <>
              <Button variant="ghost" asChild>
                <Link href="/sign-in">Sign In</Link>
              </Button>
              <Button asChild>
                <Link href="/sign-up">Sign Up</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
} 