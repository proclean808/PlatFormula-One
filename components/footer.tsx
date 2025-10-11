import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t border-border py-12 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-7xl">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div className="space-y-4">
            <div className="text-xl font-bold">
              PlatFormula<span className="text-primary">.One</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Accelerating AI SaaS startups from concept to enterprise scale.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Programs</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="#" className="hover:text-foreground transition-colors">
                  Foundry
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-foreground transition-colors">
                  Forge
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-foreground transition-colors">
                  Crucible
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="#" className="hover:text-foreground transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-foreground transition-colors">
                  Team
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-foreground transition-colors">
                  Portfolio
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-foreground transition-colors">
                  Careers
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="#" className="hover:text-foreground transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-foreground transition-colors">
                  Case Studies
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-foreground transition-colors">
                  Documentation
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-foreground transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>&copy; 2025 PlatFormula.One. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-foreground transition-colors">
              Privacy
            </Link>
            <Link href="#" className="hover:text-foreground transition-colors">
              Terms
            </Link>
            <Link href="#" className="hover:text-foreground transition-colors">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
