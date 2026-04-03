import { Footer } from '@/components/Footer'

// layout wrapper for public pages
export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  )
}
