import { Button } from '@/components/ui/button';
import { MainLayout } from '@/components/layouts/main-layout';
import Link from 'next/link';
import { Check } from 'lucide-react';

export default function PricingPage() {
  return (
    <MainLayout>
      <div className="container py-20">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl font-bold mb-4">Simple, Transparent Pricing</h1>
          <p className="text-xl text-muted-foreground">
            Choose the plan that works best for your coaching business
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Free Plan */}
          <div className="border rounded-lg p-8 bg-background">
            <div className="mb-8">
              <h3 className="text-lg font-medium mb-2">Free</h3>
              <div className="mb-2">
                <span className="text-3xl font-bold">$0</span>
                <span className="text-muted-foreground">/month</span>
              </div>
              <p className="text-muted-foreground">For coaches just getting started</p>
            </div>

            <ul className="space-y-3 mb-8">
              <li className="flex items-start gap-2">
                <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <span>1 course</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <span>Basic analytics</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <span>Standard support</span>
              </li>
            </ul>

            <Button className="w-full" variant="outline" asChild>
              <Link href="/sign-up">Get Started</Link>
            </Button>
          </div>

          {/* Pro Plan */}
          <div className="border rounded-lg p-8 bg-background relative">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
              Most Popular
            </div>
            <div className="mb-8">
              <h3 className="text-lg font-medium mb-2">Pro</h3>
              <div className="mb-2">
                <span className="text-3xl font-bold">$29</span>
                <span className="text-muted-foreground">/month</span>
              </div>
              <p className="text-muted-foreground">For growing coaching businesses</p>
            </div>

            <ul className="space-y-3 mb-8">
              <li className="flex items-start gap-2">
                <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <span>Unlimited courses</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <span>Advanced analytics</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <span>Priority support</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <span>Custom branding</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <span>Subscription model</span>
              </li>
            </ul>

            <Button className="w-full" asChild>
              <Link href="/sign-up">Get Started</Link>
            </Button>
          </div>

          {/* Enterprise Plan */}
          <div className="border rounded-lg p-8 bg-background">
            <div className="mb-8">
              <h3 className="text-lg font-medium mb-2">Enterprise</h3>
              <div className="mb-2">
                <span className="text-3xl font-bold">$99</span>
                <span className="text-muted-foreground">/month</span>
              </div>
              <p className="text-muted-foreground">For established coaching businesses</p>
            </div>

            <ul className="space-y-3 mb-8">
              <li className="flex items-start gap-2">
                <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <span>Everything in Pro</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <span>White-label solution</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <span>Dedicated account manager</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <span>API access</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <span>Custom integrations</span>
              </li>
            </ul>

            <Button className="w-full" variant="outline" asChild>
              <Link href="/contact">Contact Sales</Link>
            </Button>
          </div>
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
          <div className="max-w-3xl mx-auto grid gap-6">
            <div className="text-left">
              <h3 className="font-semibold mb-2">Can I switch plans later?</h3>
              <p className="text-muted-foreground">
                Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.
              </p>
            </div>
            <div className="text-left">
              <h3 className="font-semibold mb-2">How do payments work for coaches?</h3>
              <p className="text-muted-foreground">
                We handle all payments through Stripe. You'll receive payouts for your course sales and subscriptions directly to your connected bank account.
              </p>
            </div>
            <div className="text-left">
              <h3 className="font-semibold mb-2">Is there a transaction fee?</h3>
              <p className="text-muted-foreground">
                We charge a 5% transaction fee on the Free plan. Pro and Enterprise plans have reduced transaction fees of 3% and 2% respectively.
              </p>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
} 