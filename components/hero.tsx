import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles } from "lucide-react"

export function Hero() {
  return (
    <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm">
            <Sparkles className="w-4 h-4" />
            <span>AI-Powered Startup Acceleration</span>
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-balance leading-tight">
            The fastest platform for building <span className="text-primary">AI SaaS products</span>
          </h1>

          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-balance leading-relaxed">
            Transform your AI startup from concept to market leader. Get expert guidance, cutting-edge tools, and a
            proven framework to accelerate your B2B SaaS journey.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button size="lg" className="text-base px-8">
              Start Your Journey
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
            <Button size="lg" variant="outline" className="text-base px-8 bg-transparent">
              View Programs
            </Button>
          </div>

          <div className="pt-12 text-sm text-muted-foreground">Trusted by innovative startups worldwide</div>
        </div>
      </div>
    </section>
  )
}
