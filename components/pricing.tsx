import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"

const tiers = [
  {
    name: "Foundry",
    description: "Perfect for validating your AI SaaS idea",
    price: "$2,500",
    period: "3 months",
    features: [
      "Idea validation workshop",
      "Market research & competitive analysis",
      "MVP development framework",
      "Weekly group mentorship sessions",
      "Access to AI tools & infrastructure",
      "Community Slack access",
      "Pitch deck template & guidance",
    ],
    cta: "Start Building",
    highlighted: false,
  },
  {
    name: "Forge",
    description: "Scale your product and find product-market fit",
    price: "$7,500",
    period: "6 months",
    features: [
      "Everything in Foundry",
      "Bi-weekly 1-on-1 mentorship",
      "Go-to-market strategy development",
      "Customer acquisition playbook",
      "Technical architecture review",
      "Investor introduction network",
      "Priority support & office hours",
      "Demo day presentation opportunity",
    ],
    cta: "Accelerate Growth",
    highlighted: true,
  },
  {
    name: "Crucible",
    description: "Enterprise-ready scaling for serious founders",
    price: "$15,000",
    period: "12 months",
    features: [
      "Everything in Forge",
      "Weekly 1-on-1 executive coaching",
      "Enterprise sales training",
      "Fundraising strategy & support",
      "Legal & compliance guidance",
      "Dedicated technical advisor",
      "Strategic partnership introductions",
      "Lifetime alumni network access",
      "Co-marketing opportunities",
    ],
    cta: "Scale to Enterprise",
    highlighted: false,
  },
]

export function Pricing() {
  return (
    <section id="pricing" className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-balance">Choose your acceleration path</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-balance">
            From validation to enterprise scale, we have a program for every stage
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 items-start">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`relative p-8 rounded-xl border ${
                tier.highlighted
                  ? "border-primary bg-card shadow-lg shadow-primary/20 scale-105"
                  : "border-border bg-card"
              }`}
            >
              {tier.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary text-primary-foreground text-sm font-semibold rounded-full">
                  Most Popular
                </div>
              )}

              <div className="space-y-4 mb-6">
                <h3 className="text-2xl font-bold">{tier.name}</h3>
                <p className="text-muted-foreground leading-relaxed">{tier.description}</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold">{tier.price}</span>
                  <span className="text-muted-foreground">/ {tier.period}</span>
                </div>
              </div>

              <Button className="w-full mb-6" variant={tier.highlighted ? "default" : "outline"} size="lg">
                {tier.cta}
              </Button>

              <div className="space-y-3">
                {tier.features.map((feature) => (
                  <div key={feature} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-muted-foreground leading-relaxed">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-muted-foreground">
            All programs include access to our AI infrastructure, tools, and community.{" "}
            <button className="text-primary hover:underline">Compare plans in detail</button>
          </p>
        </div>
      </div>
    </section>
  )
}
