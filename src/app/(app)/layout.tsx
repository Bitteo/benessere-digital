// App route group layout — wraps all public-facing pages with Navbar and Footer.
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      {/* Offset for fixed navbar: 4.5rem desktop, 4rem mobile */}
      <div className="pt-[4.5rem] md:pt-16">{children}</div>
      <Footer />
    </>
  )
}
