'use client';

import { Bell, Search, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useSession, signOut } from '@/lib/auth-client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useRouter } from 'next/navigation';

export function DashboardHeader() {
  const { data: session } = useSession();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push('/sign-in');
        },
      },
    });
  };

  return (
    <header className='h-16 border-b bg-background flex items-center px-6'>
      <div className='flex-1 flex items-center'>
        <div className='relative w-full max-w-md'>
          <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground' />
          <Input placeholder='Search...' className='pl-10 w-full bg-muted/50' />
        </div>
      </div>
      <div className='flex items-center gap-4'>
        <Button variant='ghost' size='icon' className='relative'>
          <Bell className='h-5 w-5' />
          <span className='absolute top-1 right-1 h-2 w-2 rounded-full bg-primary'></span>
        </Button>
        <div className='flex items-center gap-2'>
          <div className='text-sm hidden md:block'>
            <p className='font-medium'>{session?.user?.name || 'User'}</p>
            <p className='text-xs text-muted-foreground'>
              {session?.user?.email}
            </p>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='ghost' className='relative h-8 w-8 rounded-full'>
                <Avatar className='h-8 w-8'>
                  <AvatarImage
                    src={session?.user?.image || ''}
                    alt={session?.user?.name || 'User'}
                  />
                  <AvatarFallback>
                    <User className='h-4 w-4' />
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              <DropdownMenuItem className='font-medium'>
                {session?.user?.name || 'User'}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleSignOut}>
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
