// This file is used to override the Next.js App Router types

declare namespace NextAppRouter {
  interface PageProps {
    params: Record<string, string>;
    searchParams?: Record<string, string | string[]>;
  }
} 