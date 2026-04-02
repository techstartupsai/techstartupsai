export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="mb-2 text-3xl font-bold tracking-tight">Contact</h1>
      <p className="mb-12 text-muted-foreground">
        We&apos;d love to hear from you — founders, investors, job seekers, or press.
      </p>

      <div className="flex flex-col gap-8">
        <div className="rounded-xl border border-border bg-card p-6">
          <div className="mb-4 text-2xl">💬</div>
          <h2 className="mb-1 font-semibold text-foreground">General enquiries</h2>
          <p className="mb-3 text-sm text-muted-foreground">
            Questions, feedback, partnership ideas.
          </p>
          <a
            href="mailto:hello@techstartups.ai"
            className="text-sm text-primary underline-offset-4 hover:underline"
          >
            hello@techstartups.ai
          </a>
        </div>

        <div className="rounded-xl border border-border bg-card p-6">
          <div className="mb-4 text-2xl">📰</div>
          <h2 className="mb-1 font-semibold text-foreground">Press & media</h2>
          <p className="mb-3 text-sm text-muted-foreground">
            Interview requests, press kit, and media assets.
          </p>
          <a
            href="mailto:press@techstartups.ai"
            className="text-sm text-primary underline-offset-4 hover:underline"
          >
            press@techstartups.ai
          </a>
        </div>

        <div className="rounded-xl border border-border bg-card p-6">
          <div className="mb-4 text-2xl">🛟</div>
          <h2 className="mb-1 font-semibold text-foreground">Support</h2>
          <p className="mb-3 text-sm text-muted-foreground">
            Billing, account issues, and technical help.
          </p>
          <a
            href="mailto:support@techstartups.ai"
            className="text-sm text-primary underline-offset-4 hover:underline"
          >
            support@techstartups.ai
          </a>
        </div>
      </div>
    </div>
  )
}
