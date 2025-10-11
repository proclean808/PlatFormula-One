import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            PlatFormula.One
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            AI-Powered Startup Accelerator Program & Founders&apos; Toolbox
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <FeatureCard
            title="Dashboard"
            description="Track your progress and upcoming deadlines"
            href="/dashboard"
            icon="📊"
          />
          <FeatureCard
            title="Application Builder"
            description="Guided application process with autosave"
            href="/application"
            icon="📝"
          />
          <FeatureCard
            title="Resource Directory"
            description="Searchable library of startup resources"
            href="/resources"
            icon="📚"
          />
          <FeatureCard
            title="Readiness Score"
            description="AI-powered assessment of your startup"
            href="/readiness"
            icon="🎯"
          />
          <FeatureCard
            title="Program Timeline"
            description="Calendar with sync capabilities"
            href="/timeline"
            icon="📅"
          />
          <FeatureCard
            title="Community Forums"
            description="Connect with other founders"
            href="/forums"
            icon="💬"
          />
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/admin"
            className="text-blue-600 hover:text-blue-800 underline"
          >
            Admin Panel
          </Link>
        </div>
      </div>
    </main>
  )
}

function FeatureCard({
  title,
  description,
  href,
  icon,
}: {
  title: string
  description: string
  href: string
  icon: string
}) {
  return (
    <Link href={href}>
      <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer h-full">
        <div className="text-4xl mb-4">{icon}</div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </Link>
  )
}
