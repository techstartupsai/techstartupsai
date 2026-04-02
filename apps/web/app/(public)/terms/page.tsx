export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="mb-2 text-3xl font-bold tracking-tight">Terms of Service</h1>
      <p className="mb-12 text-sm text-muted-foreground">
        Effective date: January 1, 2026 · Last updated: April 2, 2026 · Contact:{' '}
        <a
          href="mailto:hello@techstartups.ai"
          className="text-primary underline-offset-4 hover:underline"
        >
          hello@techstartups.ai
        </a>
      </p>

      <div className="flex flex-col gap-10 text-sm leading-relaxed text-muted-foreground">
        <section>
          <h2 className="mb-3 text-base font-semibold text-foreground">1. Acceptance of Terms</h2>
          <p>
            By accessing or using TechStartups.ai (the &ldquo;Platform&rdquo;), you agree to be
            bound by these Terms of Service (&ldquo;Terms&rdquo;). If you do not agree, you may not
            use the Platform. These Terms form a binding contract between you and TechStartups.ai
            (&ldquo;Company,&rdquo; &ldquo;we,&rdquo; or &ldquo;us&rdquo;).
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-base font-semibold text-foreground">
            2. Description of Services
          </h2>
          <p className="mb-3">
            TechStartups.ai is an AI-powered startup intelligence platform. Depending on your
            subscription tier, you may access:
          </p>
          <ul className="mb-3 flex list-disc flex-col gap-1 pl-5">
            <li>Startup profiles, momentum scores, and AI-generated analysis</li>
            <li>Fundraising tools and investor-founder matching (Founder and Investor modes)</li>
            <li>Job discovery and startup culture insights (Job Seeker mode)</li>
            <li>A curated content feed, news, and deal alerts</li>
          </ul>
          <p>
            The Platform offers three user modes —{' '}
            <strong className="font-medium text-foreground">
              Job Seeker, Founder, and Investor
            </strong>{' '}
            — each with Free, Tier 1, and Tier 2 subscription levels. Features available to you
            depend on your mode and tier. We reserve the right to modify, add, or remove features
            with reasonable notice.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-base font-semibold text-foreground">3. Account Registration</h2>
          <p>
            You must be at least 18 years old to create an account. You agree to provide accurate,
            current, and complete information during registration and to keep this information up to
            date. You are responsible for maintaining the confidentiality of your login credentials
            and for all activity that occurs under your account. You may not create more than one
            account per person, or create accounts on behalf of others without authorization.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-base font-semibold text-foreground">
            4. Subscriptions & Billing
          </h2>
          <p className="mb-3">
            Paid subscriptions are billed monthly or annually in advance. Annual plans are offered
            at a <strong className="font-medium text-foreground">20% discount</strong>. Payments are
            processed by Stripe. Your subscription automatically renews unless you cancel before the
            renewal date.
          </p>
          <p>
            Cancellation takes effect at the end of your current billing period — no partial-period
            refunds are issued, except as required by applicable law. We reserve the right to change
            pricing with at least 30 days&apos; written notice. If you disagree with a price change,
            you may cancel before the change takes effect.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-base font-semibold text-foreground">5. Acceptable Use</h2>
          <p className="mb-2">You agree not to:</p>
          <ul className="mb-3 flex list-disc flex-col gap-1 pl-5">
            <li>Scrape, copy, or extract platform data in bulk by automated means</li>
            <li>Reverse engineer, decompile, or attempt to extract source code</li>
            <li>Create false or misleading startup profiles or investment data</li>
            <li>
              Use the Platform to facilitate fraud, market manipulation, or securities violations
            </li>
            <li>Share account credentials or sell access to your account</li>
            <li>Transmit malware, viruses, or other harmful code</li>
            <li>Use the Platform in any manner that violates applicable laws</li>
          </ul>
          <p>
            Violations may result in immediate account suspension or termination without refund.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-base font-semibold text-foreground">6. AI-Generated Content</h2>
          <p>
            The Platform uses artificial intelligence to generate startup analyses, momentum scores,
            and investment-related content. This content is for{' '}
            <strong className="font-medium text-foreground">informational purposes only</strong> and
            does not constitute financial, investment, legal, or professional advice.
            TechStartups.ai does not guarantee the accuracy, completeness, or timeliness of
            AI-generated content. You should conduct your own due diligence before making any
            investment, hiring, or business decision.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-base font-semibold text-foreground">7. Intellectual Property</h2>
          <p className="mb-3">
            The Platform — including its design, code, AI models, scoring methodologies, and
            proprietary datasets — is owned by TechStartups.ai and protected by copyright,
            trademark, and other intellectual property laws. You may not reproduce, distribute, or
            create derivative works without our written permission.
          </p>
          <p>
            Content you submit to the Platform (startup descriptions, investment criteria, profile
            information) remains yours. By submitting it, you grant us a non-exclusive, royalty-free
            license to use, display, and analyze it to provide and improve the Platform.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-base font-semibold text-foreground">8. Disclaimers</h2>
          <p>
            The Platform is provided &ldquo;as is&rdquo; and &ldquo;as available&rdquo; without
            warranties of any kind, express or implied. We do not warrant that the Platform will be
            uninterrupted or error-free. Startup and funding data is aggregated from public records
            and user submissions and may contain inaccuracies. TechStartups.ai is not responsible
            for decisions made based on Platform content.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-base font-semibold text-foreground">
            9. Limitation of Liability
          </h2>
          <p>
            To the maximum extent permitted by law, TechStartups.ai shall not be liable for
            indirect, incidental, consequential, or punitive damages arising from your use of the
            Platform. Our total liability for any claim shall not exceed the fees you paid to us in
            the 12 months preceding the claim.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-base font-semibold text-foreground">
            10. Governing Law & Disputes
          </h2>
          <p>
            These Terms are governed by the laws of the{' '}
            <strong className="font-medium text-foreground">State of California</strong>, without
            regard to conflict of law principles. Any dispute shall be resolved in the state or
            federal courts located in{' '}
            <strong className="font-medium text-foreground">San Mateo County, California</strong>.
            You waive any objection to jurisdiction or venue in such courts.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-base font-semibold text-foreground">11. Changes to Terms</h2>
          <p>
            We may update these Terms from time to time. For material changes, we will provide at
            least 30 days&apos; notice via email or prominent in-app notification. Continued use
            after the effective date constitutes acceptance of the revised Terms.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-base font-semibold text-foreground">12. Contact</h2>
          <p className="mb-1">For questions about these Terms:</p>
          <p>
            Email:{' '}
            <a
              href="mailto:hello@techstartups.ai"
              className="text-primary underline-offset-4 hover:underline"
            >
              hello@techstartups.ai
            </a>
          </p>
        </section>
      </div>
    </div>
  )
}
