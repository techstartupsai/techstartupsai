export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="mb-2 text-3xl font-bold tracking-tight">Privacy Policy</h1>
      <p className="mb-12 text-sm">
        Effective date: January 1, 2026 · Last updated: April 2, 2026 · Contact:{' '}
        <a
          href="mailto:hello@techstartups.ai"
          className="text-primary underline-offset-4 hover:underline"
        >
          hello@techstartups.ai
        </a>
      </p>

      <div className="flex flex-col gap-10 text-sm leading-relaxed">
        <section>
          <h2 className="mb-3 text-base font-semibold text-foreground">1. Introduction</h2>
          <p>
            TechStartups.ai ("we," "our," or "us") operates the startup intelligence platform at
            techstartups.ai. This Privacy Policy explains how we collect, use, disclose, and protect
            your personal information when you use our platform.
          </p>
          <p className="mt-3">
            By creating an account or accessing TechStartups.ai, you agree to this Privacy Policy.
            If you do not agree, please do not use our services.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-base font-semibold text-foreground">
            2. Information We Collect
          </h2>
          <div className="flex flex-col gap-4">
            <div>
              <p className="mb-2 font-medium text-foreground">Information you provide directly:</p>
              <ul className="flex list-disc flex-col gap-1 pl-5">
                <li>
                  Account registration: name, email address, and your user type (Job Seeker,
                  Founder, or Investor)
                </li>
                <li>
                  Profile details: depending on your user type, this may include your company name,
                  investment criteria, startup stage, funding history, or career preferences
                </li>
                <li>
                  Payment information: billing address and card details, processed by Stripe on our
                  behalf — we do not store card numbers
                </li>
                <li>Communications: messages you send to our support team</li>
              </ul>
            </div>
            <div>
              <p className="mb-2 font-medium text-foreground">
                Information collected automatically:
              </p>
              <ul className="flex list-disc flex-col gap-1 pl-5">
                <li>
                  Usage data: pages visited, features used, search queries, AI features accessed,
                  and interaction timestamps
                </li>
                <li>
                  Device and connection data: browser type, operating system, IP address, and
                  approximate location
                </li>
                <li>Cookies and similar technologies (see section 7)</li>
              </ul>
            </div>
            <div>
              <p className="mb-2 font-medium text-foreground">Information from third parties:</p>
              <ul className="flex list-disc flex-col gap-1 pl-5">
                <li>OAuth providers (Google, LinkedIn) if you use social login</li>
                <li>
                  Publicly available startup data, funding records, and news aggregated to populate
                  platform content
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section>
          <h2 className="mb-3 text-base font-semibold text-foreground">
            3. How We Use Your Information
          </h2>
          <p className="mb-2">We use your information to:</p>
          <ul className="flex list-disc flex-col gap-1 pl-5">
            <li>Provide, maintain, and personalize your TechStartups.ai experience</li>
            <li>
              Generate AI-powered startup analysis, momentum scores, and recommendations tailored to
              your user type
            </li>
            <li>Process subscription payments and send billing confirmations</li>
            <li>
              Send product updates, newsletters, and marketing communications (you can opt out at
              any time)
            </li>
            <li>Detect, prevent, and respond to fraud, abuse, or security incidents</li>
            <li>
              Improve our AI models and platform features using aggregated, de-identified data
            </li>
            <li>Comply with applicable laws and legal obligations</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-3 text-base font-semibold text-foreground">4. Information Sharing</h2>
          <p className="mb-3">
            We do not sell your personal data. We share information only in these circumstances:
          </p>
          <ul className="flex list-disc flex-col gap-2 pl-5">
            <li>
              <strong className="font-medium text-foreground">Service providers:</strong> Supabase
              (database hosting), Vercel (web hosting), Stripe (payments), Resend (transactional
              email), PostHog and Google Analytics (product analytics), Sentry (error monitoring),
              and Railway (AI service hosting). Each provider is bound by data processing
              agreements.
            </li>
            <li>
              <strong className="font-medium text-foreground">Legal requirements:</strong> We may
              disclose your information if required by law, court order, or governmental authority.
            </li>
            <li>
              <strong className="font-medium text-foreground">Business transfers:</strong> If
              TechStartups.ai is acquired or merged, your information may be transferred as part of
              that transaction. We will notify you beforehand.
            </li>
            <li>
              <strong className="font-medium text-foreground">Aggregated insights:</strong> We may
              publish anonymized, aggregated statistics that cannot identify individuals.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="mb-3 text-base font-semibold text-foreground">5. Data Retention</h2>
          <p>
            We retain your personal data for as long as your account is active or as needed to
            provide our services. If you delete your account, we will remove or anonymize your
            personal data within 90 days, unless retention is required to comply with legal
            obligations, resolve disputes, or enforce our agreements. Anonymized analytics data may
            be retained indefinitely.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-base font-semibold text-foreground">6. Security</h2>
          <p className="mb-2">We protect your data through:</p>
          <ul className="mb-3 flex list-disc flex-col gap-1 pl-5">
            <li>TLS encryption in transit</li>
            <li>Encryption at rest via Supabase infrastructure</li>
            <li>Strict access controls and authentication requirements</li>
            <li>Regular security reviews</li>
            <li>Error monitoring via Sentry</li>
          </ul>
          <p>
            No system is completely secure. If you believe your account has been compromised,
            contact us immediately at{' '}
            <a
              href="mailto:hello@techstartups.ai"
              className="text-primary underline-offset-4 hover:underline"
            >
              hello@techstartups.ai
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-base font-semibold text-foreground">
            7. Cookies & Tracking Technologies
          </h2>
          <p className="mb-3">We use cookies and similar technologies for:</p>
          <ul className="mb-3 flex list-disc flex-col gap-2 pl-5">
            <li>
              <strong className="font-medium text-foreground">Essential cookies:</strong>{' '}
              Authentication sessions and security tokens required for the platform to function
            </li>
            <li>
              <strong className="font-medium text-foreground">Analytics cookies:</strong> PostHog
              and Google Analytics to understand how users interact with the platform
            </li>
          </ul>
          <p>
            You can manage cookie preferences through your browser settings. Opting out of analytics
            cookies will not affect platform functionality. We do not use cookies for advertising.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-base font-semibold text-foreground">8. Your Rights</h2>
          <p className="mb-2">Depending on your jurisdiction, you may have the right to:</p>
          <ul className="mb-3 flex list-disc flex-col gap-1 pl-5">
            <li>Access the personal data we hold about you</li>
            <li>Correct inaccurate or incomplete data</li>
            <li>Request deletion of your data ("right to be forgotten")</li>
            <li>Restrict or object to certain processing activities</li>
            <li>Data portability (receive your data in a structured, machine-readable format)</li>
            <li>Withdraw consent where processing is based on consent</li>
          </ul>
          <p>
            California residents have additional rights under the CCPA. EU and UK residents have
            rights under the GDPR. To exercise any right, email{' '}
            <a
              href="mailto:hello@techstartups.ai"
              className="text-primary underline-offset-4 hover:underline"
            >
              hello@techstartups.ai
            </a>
            . We will respond within 30 days.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-base font-semibold text-foreground">
            {"9. Children's Privacy"}
          </h2>
          <p>
            TechStartups.ai is not intended for users under 18 years of age. We do not knowingly
            collect personal information from minors. If you believe a minor has provided us with
            personal data, contact us and we will delete it promptly.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-base font-semibold text-foreground">
            10. International Transfers
          </h2>
          <p>
            TechStartups.ai is operated from the United States. If you access our platform from
            outside the United States, your information may be transferred to and processed in the
            U.S., where data protection laws may differ from those in your country.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-base font-semibold text-foreground">
            11. Changes to This Policy
          </h2>
          <p>
            We may update this Privacy Policy from time to time. For material changes, we will
            notify you via email at least 30 days before the changes take effect. Continued use of
            TechStartups.ai after the effective date constitutes acceptance of the revised policy.
            The current version is always available at techstartups.ai/privacy.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-base font-semibold text-foreground">12. Contact</h2>
          <p className="mb-1">For questions, requests, or concerns about this Privacy Policy:</p>
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
