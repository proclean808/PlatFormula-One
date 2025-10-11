import { Rocket, Zap, Users, TrendingUp, Code, Shield } from "lucide-react"

const features = [
  {
    icon: Rocket,
    title: "Rapid Launch",
    description:
      "Go from idea to MVP in weeks, not months. Our proven framework accelerates your development timeline.",
  },
  {
    icon: Zap,
    title: "AI-First Tools",
    description: "Access cutting-edge AI tools and infrastructure designed specifically for B2B SaaS applications.",
  },
  {
    icon: Users,
    title: "Expert Mentorship",
    description:
      "Learn from founders who have built and scaled successful AI companies to hundreds of millions in revenue.",
  },
  {
    icon: TrendingUp,
    title: "Growth Strategy",
    description: "Master B2B sales, marketing, and growth tactics that actually work for AI SaaS businesses.",
  },
  {
    icon: Code,
    title: "Technical Excellence",
    description: "Build on best practices for scalable architecture, security, and performance from day one.",
  },
  {
    icon: Shield,
    title: "Enterprise Ready",
    description: "Learn how to build enterprise-grade features, compliance, and security that large customers demand.",
  },
]

export function Features() {
  return (
    <section id="features" className="py-24 px-4 sm:px-6 lg:px-8 bg-card/30">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-balance">Everything you need to succeed</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-balance">
            A comprehensive accelerator program designed for AI SaaS founders
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="p-6 rounded-lg bg-card border border-border hover:border-primary/50 transition-colors"
            >
              <feature.icon className="w-10 h-10 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
