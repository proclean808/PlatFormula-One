import { createClient } from "@/lib/supabase/server"
import { notFound } from "next/navigation"
import { CategoryThreads } from "@/components/forums/category-threads"
import type { ForumCategory, ForumThread, Profile } from "@/lib/types/database"

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const supabase = await createClient()

  // Fetch category
  const { data: category } = await supabase.from("forum_categories").select("*").eq("slug", slug).single()

  if (!category) {
    notFound()
  }

  // Fetch threads for this category
  const { data: threads } = await supabase
    .from("forum_threads")
    .select("*, profiles(*)")
    .eq("category_id", category.id)
    .order("is_pinned", { ascending: false })
    .order("created_at", { ascending: false })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{category.name}</h1>
        <p className="text-muted-foreground">{category.description}</p>
      </div>

      <CategoryThreads
        category={category as ForumCategory}
        threads={threads as (ForumThread & { profiles: Profile })[]}
      />
    </div>
  )
}
