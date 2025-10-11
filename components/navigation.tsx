import Link from "next/link"
import { Button } from "@/components/ui/button"

export function Navigation() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <Link href="/" className="text-xl font-bold text-foreground">
              PlatFormula<span className="text-primary">.One</span>
            </Link>
            <div className="hidden md:flex items-center gap-6">
              <Link href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Features
              </Link>
              <Link href="#pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Pricing
              </Link>
              <Link href="#about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                About
              </Link>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm">
              Sign In
            </Button>
            <Button size="sm">Get Started</Button>
          </div>
        </div>
      </div>
    </nav>
  )
}
