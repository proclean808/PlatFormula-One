import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { ApplicationBuilder } from "@/components/application/application-builder"
import type { Application, Program } from "@/lib/types/database"

export default async function ApplicationPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  // Fetch available programs
  const { data: programs } = await supabase.from("programs").select("*").eq("status", "active")

  // Fetch user's existing application (if any)
  const { data: existingApplication } = await supabase
    .from("applications")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(1)
    .single()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Program Application</h1>
        <p className="text-muted-foreground">Complete your application to join the accelerator program</p>
      </div>

      <ApplicationBuilder
        userId={user.id}
        programs={programs as Program[]}
        existingApplication={existingApplication as Application | null}
      />
    </div>
  )
}
