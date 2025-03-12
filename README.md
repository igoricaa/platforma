# Strength & Conditioning Coaching Platform

A comprehensive platform for strength and conditioning coaches to create, share, and monetize their expertise through online courses and subscriptions.

## Features

- **For Coaches:**
  - Create and manage courses with modules and lessons
  - Set pricing for individual courses
  - Offer subscription-based access to all content
  - Track student progress and engagement
  - Analyze revenue and sales data
  - Customize coach profile and specialties

- **For Users:**
  - Browse and purchase individual courses
  - Subscribe to coaches for access to all their content
  - Track learning progress
  - Discover new courses and coaches
  - Secure authentication and payment processing

## Tech Stack

- **Frontend:** Next.js, React, Tailwind CSS
- **Backend:** PostgreSQL with Drizzle ORM
- **Authentication:** Better Auth
- **Payments:** Stripe

## Getting Started

### Prerequisites

- Node.js 18+ and pnpm
- PostgreSQL database (local or Neon)
- Better Auth setup
- Stripe account for payments

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/sc-platform.git
   cd sc-platform
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Set up environment variables:
   - Copy `.env.local.example` to `.env.local`
   - Fill in your PostgreSQL, Better Auth, and Stripe credentials

4. Run the development server:
   ```bash
   pnpm dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

- `/app` - Next.js app directory
- `/components` - React components
- `/lib` - Utility functions and shared code
- `/public` - Static assets
- `/styles` - Global styles
- `/db` - Database schema and configuration

## Deployment

This application can be deployed to Vercel:

```bash
pnpm build
vercel deploy
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.
