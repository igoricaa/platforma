import Link from 'next/link';

export function Footer() {
  return (
    <footer className='border-t bg-background py-8'>
      <div className='container mx-auto'>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-8'>
          <div>
            <h3 className='text-lg font-semibold mb-4'>S&C Platform</h3>
            <p className='text-sm text-muted-foreground'>
              The ultimate platform for strength and conditioning coaches to
              share their expertise.
            </p>
          </div>
          <div>
            <h3 className='text-lg font-semibold mb-4'>Links</h3>
            <ul className='space-y-2'>
              <li>
                <Link
                  href='/'
                  className='text-sm text-muted-foreground hover:text-foreground'
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href='/pricing'
                  className='text-sm text-muted-foreground hover:text-foreground'
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  href='/contact'
                  className='text-sm text-muted-foreground hover:text-foreground'
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className='text-lg font-semibold mb-4'>Legal</h3>
            <ul className='space-y-2'>
              <li>
                <Link
                  href='/terms'
                  className='text-sm text-muted-foreground hover:text-foreground'
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href='/privacy'
                  className='text-sm text-muted-foreground hover:text-foreground'
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className='text-lg font-semibold mb-4'>Contact</h3>
            <ul className='space-y-2'>
              <li className='text-sm text-muted-foreground'>
                Email: info@scplatform.com
              </li>
              <li className='text-sm text-muted-foreground'>
                Phone: +1 (123) 456-7890
              </li>
            </ul>
          </div>
        </div>
        <div className='mt-8 pt-8 border-t text-center text-sm text-muted-foreground'>
          &copy; {new Date().getFullYear()} S&C Platform. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
