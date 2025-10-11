import { createClient } from "@/lib/supabase/server"
import { ForumCategories } from "@/components/forums/forum-categories"
import type { ForumCategory, ForumThread, Profile } from "@/lib/types/database"

export default async function ForumsPage() {
  const supabase = await createClient()

  // Fetch forum categories
  const { data: categories } = await supabase.from("forum_categories").select("*").order("order_index")

  // Fetch recent threads with author info
  const { data: threads } = await supabase
    .from("forum_threads")
    .select("*, profiles(*)")
    .order("created_at", { ascending: false })
    .limit(20)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Community Forums</h1>
        <p className="text-muted-foreground">Connect with fellow founders and share knowledge</p>
      </div>

      <ForumCategories
        categories={categories as ForumCategory[]}
        threads={threads as (ForumThread & { profiles: Profile })[]}
      />
    </div>
  )
}
