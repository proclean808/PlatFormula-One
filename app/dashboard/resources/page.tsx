import { createClient } from "@/lib/supabase/server"
import { ResourceDirectory } from "@/components/resources/resource-directory"
import type { Resource } from "@/lib/types/database"

export default async function ResourcesPage() {
  const supabase = await createClient()

  // Fetch all resources
  const { data: resources } = await supabase.from("resources").select("*").order("created_at", { ascending: false })

  // Fetch categories (unique categories from resources)
  const categories = Array.from(new Set(resources?.map((r) => r.category) || []))

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Resource Directory</h1>
        <p className="text-muted-foreground">Explore curated resources to help you build your startup</p>
      </div>

      <ResourceDirectory resources={resources as Resource[]} categories={categories} />
    </div>
  )
}
