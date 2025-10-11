export function Stats() {
  const stats = [
    { value: "150+", label: "Startups Accelerated" },
    { value: "$500M+", label: "Total Funding Raised" },
    { value: "85%", label: "Success Rate" },
    { value: "3x", label: "Faster Time to Market" },
  ]

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 border-y border-border">
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center space-y-2">
              <div className="text-4xl sm:text-5xl font-bold text-primary">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
