import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { NewThreadForm } from "@/components/forums/new-thread-form"
import type { ForumCategory } from "@/lib/types/database"

export default async function NewThreadPage({ searchParams }: { searchParams: Promise<{ category?: string }> }) {
  const params = await searchParams
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  // Fetch categories
  const { data: categories } = await supabase.from("forum_categories").select("*").order("order_index")

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Create New Thread</h1>
        <p className="text-muted-foreground">Start a new discussion in the community</p>
      </div>

      <NewThreadForm
        userId={user.id}
        categories={categories as ForumCategory[]}
        preselectedCategoryId={params.category}
      />
    </div>
  )
}
