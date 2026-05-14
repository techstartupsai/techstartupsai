'use client'

import { type ReactNode } from 'react'
import { Check } from 'lucide-react'
import { Button } from '@techstartups/ui'
import { cn } from '@/lib/utils'
import { GetEarlyAccessButton } from '@/components/GetEarlyAccessButton'
import { useJoinWaitlistModal } from '@/lib/useJoinWaitlistModal'
import { type UserType } from '@/lib/schemas'

interface Plan {
  name: string
  price: number | null
  isPopular?: boolean
  features: string[]
}

interface UserTier {
  id: UserType
  label: string
  icon: ReactNode
  tag: string
  description: string
  plans: Plan[]
}

const USER_TIERS: UserTier[] = [
  {
    id: 'job_seeker',
    label: 'Job seeker',
    icon: '🎯',
    tag: 'Find stable, growing companies',
    description:
      'Find stable, growing companies before job postings go live. Hiring signals, runway health, culture analysis.',
    plans: [
      {
        name: 'Career',
        price: null,
        features: [
          'Browse startup profiles',
          'Basic momentum score',
          '3 AI snapshots/month',
          'Public leaderboard',
        ],
      },
      {
        name: 'Career Starter',
        price: 9,
        features: [
          'Full momentum score + trend',
          '20 AI snapshots/month',
          'Hiring signal alerts',
          'Salary estimates',
          'Watchlist (10 startups)',
        ],
      },
      {
        name: 'Career Pro',
        price: 19,
        isPopular: true,
        features: [
          'Unlimited AI snapshots',
          'Pre-signal alerts',
          'Layoff risk indicator',
          'Interview prep AI',
          'Unlimited watchlist',
        ],
      },
    ],
  },
  {
    id: 'founder',
    label: 'Founder',
    icon: <span className="inline-block -scale-x-100">🦄</span>,
    tag: 'Raise smarter, get discovered',
    description:
      'Raise smarter. Track competitors, get discovered by investors, close your round with AI-powered tools.',
    plans: [
      {
        name: 'Founder',
        price: null,
        features: ['Claim startup profile', 'Basic public page', 'Community feed', 'Blog access'],
      },
      {
        name: 'Founder Starter',
        price: 19,
        features: [
          'Full momentum score',
          'Competitor tracking (3)',
          'AI startup analysis',
          'Investor interest signals',
          'Fundraising Mode basic',
        ],
      },
      {
        name: 'Founder Pro',
        price: 49,
        isPopular: true,
        features: [
          'Unlimited competitors',
          'AI investor matching',
          'Private data room',
          'Pitch deck scoring',
          'Investor memo + term sheet AI',
        ],
      },
    ],
  },
  {
    id: 'investor',
    label: 'Investor',
    icon: '💎',
    tag: 'Find the next big thing early',
    description:
      "Source deals before they're obvious. Real-time deal flow, AI due diligence, direct founder introductions.",
    plans: [
      {
        name: 'Investor',
        price: null,
        features: [
          'Browse public profiles',
          'Basic momentum scores',
          'Public leaderboard',
          '3 AI deep dives/month',
        ],
      },
      {
        name: 'Investor Starter',
        price: 49,
        features: [
          'Unlimited AI deep dives',
          'Full momentum + trajectory',
          'Deal flow feed',
          'Thesis filter',
          'Due diligence reports',
        ],
      },
      {
        name: 'Investor Pro',
        price: 99,
        isPopular: true,
        features: [
          'Mutual opt-in intros',
          'Private data room',
          'Portfolio dashboard',
          'VC activity tracker',
          'API access',
        ],
      },
    ],
  },
]

/*
 * Public landing page — hero, pricing plans, and FAQ.
 */
export default function HomePage() {
  const { open: openWaitlistModal } = useJoinWaitlistModal()

  return (
    <div className="flex flex-col">
      {/* Hero section */}
      <section className="mx-auto flex w-full max-w-4xl flex-col items-center gap-6 px-4 py-14 text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
          Startup Tracking,
          <span className="block text-primary">powered by AI</span>
        </h1>

        <p className="max-w-2xl text-lg transition-all duration-300">
          Continuous intelligence for job seekers, founders, and investors.
        </p>

        {/* Waitlist CTA */}
        <div className="flex w-full max-w-md flex-col items-center gap-3">
          <GetEarlyAccessButton />
        </div>
      </section>

      {/* Pricing plans */}
      <section id="pricing" className="mx-auto w-full max-w-6xl px-4 py-16">
        <div className="mb-8 text-center">
          <h2 className="mb-2 text-3xl font-bold tracking-tight">Simple, transparent pricing</h2>
          <p>Pick your role. Combine any way you want.</p>
        </div>

        <div className="mx-auto mb-8 flex w-fit max-w-2xl items-start gap-3 rounded-xl border border-green-600/30 bg-green-500/10 px-5 py-4 text-sm text-green-700 dark:border-green-500/25 dark:text-green-400">
          <span className="mt-0.5 shrink-0">⚡</span>
          <p>
            Add a 2nd or 3rd role and
            <strong className="font-semibold text-green-600 dark:text-green-300"> save 25% </strong>
            on each. Go annual for another
            <strong className="font-semibold text-green-600 dark:text-green-300"> 20% off</strong>.
          </p>
        </div>

        <div className="flex flex-col gap-10">
          {USER_TIERS.map(({ id, icon, label, tag, plans }) => (
            <div key={id} id={`pricing-${id}`} className="flex scroll-mt-20 flex-col gap-4">
              <div className="flex items-center gap-3">
                <h3 className="font-semibold">
                  {icon} {label}
                </h3>
                <span className="text-sm text-muted-foreground">{tag}</span>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                {plans.map(({ name, price, isPopular, features }) => (
                  <div
                    key={name}
                    className={cn(
                      'flex flex-col rounded-xl border p-5',
                      isPopular
                        ? 'border-primary bg-primary/5 ring-1 ring-primary/20'
                        : 'border-border bg-card'
                    )}
                  >
                    <div className="mb-4 flex items-start justify-between gap-2">
                      <div>
                        <p className="font-semibold">{name}</p>
                        <p className="text-2xl font-bold">
                          {price === null ? 'Free' : `$${price}`}
                          {price !== null && (
                            <span className="text-sm font-normal text-muted-foreground">/mo</span>
                          )}
                        </p>
                      </div>
                      {isPopular && (
                        <span className="shrink-0 rounded-full bg-primary px-2.5 py-0.5 text-xs font-medium text-primary-foreground">
                          Most popular
                        </span>
                      )}
                    </div>

                    <ul className="mb-6 flex flex-col gap-1.5 text-sm text-muted-foreground">
                      {features.map((feature) => (
                        <li key={feature} className="flex items-start gap-2">
                          <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                          {feature}
                        </li>
                      ))}
                    </ul>

                    <Button
                      variant={isPopular ? 'default' : 'outline'}
                      className="mt-auto w-full"
                      onClick={openWaitlistModal}
                    >
                      {price === null ? 'Get started free' : 'Join waitlist'}
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
