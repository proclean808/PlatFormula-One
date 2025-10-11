import { createClient } from "@/lib/supabase/server"
import { notFound, redirect } from "next/navigation"
import { ThreadView } from "@/components/forums/thread-view"
import type { ForumThread, ForumReply, Profile } from "@/lib/types/database"

export default async function ThreadPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  // Fetch thread with author
  const { data: thread } = await supabase.from("forum_threads").select("*, profiles(*)").eq("id", id).single()

  if (!thread) {
    notFound()
  }

  // Fetch replies with authors
  const { data: replies } = await supabase
    .from("forum_replies")
    .select("*, profiles(*)")
    .eq("thread_id", id)
    .order("created_at")

  // Increment view count
  await supabase
    .from("forum_threads")
    .update({ view_count: thread.view_count + 1 })
    .eq("id", id)

  return (
    <ThreadView
      thread={thread as ForumThread & { profiles: Profile }}
      replies={replies as (ForumReply & { profiles: Profile })[]}
      currentUserId={user.id}
    />
  )
}
