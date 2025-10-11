import { Navigation } from "@/components/navigation"
import { Hero } from "@/components/hero"
import { Stats } from "@/components/stats"
import { Features } from "@/components/features"
import { Pricing } from "@/components/pricing"
import { CTA } from "@/components/cta"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <Hero />
      <Stats />
      <Features />
      <Pricing />
      <CTA />
      <Footer />
    </main>
  )
}
