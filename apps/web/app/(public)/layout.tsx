import { Footer } from '@/components/Footer'

/**
 * Layout wrapper for public pages — adds the footer below main content.
 */
export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  )
}
