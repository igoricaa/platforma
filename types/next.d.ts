import { Metadata } from 'next';

// Define a custom type for page props
export type PageParams<T extends Record<string, string> = {}> = {
  params: T;
  searchParams?: Record<string, string | string[]>;
};

declare module 'next' {
  export interface PageProps {
    params?: Record<string, string>;
    searchParams?: Record<string, string | string[]>;
  }
} 