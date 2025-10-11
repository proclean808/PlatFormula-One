import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function CTA() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-4xl">
        <div className="relative p-12 rounded-2xl bg-card border border-border overflow-hidden">
          <div className="absolute inset-0 bg-primary/5" />
          <div className="relative z-10 text-center space-y-6">
            <h2 className="text-4xl sm:text-5xl font-bold text-balance">Ready to accelerate your AI startup?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-balance leading-relaxed">
              Join the next cohort of ambitious founders building the future of AI SaaS
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Button size="lg" className="text-base px-8">
                Apply Now
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
              <Button size="lg" variant="outline" className="text-base px-8 bg-transparent">
                Schedule a Call
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
