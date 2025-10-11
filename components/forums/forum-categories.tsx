"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MessageSquare, TrendingUp, Pin, Lock } from "lucide-react"
import Link from "next/link"
import type { ForumCategory, ForumThread, Profile } from "@/lib/types/database"

interface ForumCategoriesProps {
  categories: ForumCategory[]
  threads: (ForumThread & { profiles: Profile })[]
}

export function ForumCategories({ categories, threads }: ForumCategoriesProps) {
  return (
    <div className="space-y-6">
      {/* Categories */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => {
          const categoryThreads = threads.filter((t) => t.category_id === category.id)
          const threadCount = categoryThreads.length

          return (
            <Card key={category.id} className="hover:border-primary/50 transition-colors">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{category.name}</CardTitle>
                  <Badge variant="secondary">{threadCount}</Badge>
                </div>
                <CardDescription>{category.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild className="w-full">
                  <Link href={`/dashboard/forums/${category.slug}`}>View Discussions</Link>
                </Button>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Recent Threads */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Recent Discussions</CardTitle>
              <CardDescription>Latest threads from the community</CardDescription>
            </div>
            <Button asChild>
              <Link href="/dashboard/forums/new">New Thread</Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {threads.slice(0, 10).map((thread) => (
              <Link
                key={thread.id}
                href={`/dashboard/forums/thread/${thread.id}`}
                className="flex items-start gap-4 p-4 rounded-lg border hover:border-primary/50 transition-colors"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    {thread.is_pinned && <Pin className="h-4 w-4 text-primary" />}
                    {thread.is_locked && <Lock className="h-4 w-4 text-muted-foreground" />}
                    <h4 className="font-semibold">{thread.title}</h4>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2">{thread.content}</p>
                  <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                    <span>by {thread.profiles.full_name || "Anonymous"}</span>
                    <span>•</span>
                    <span>{new Date(thread.created_at).toLocaleDateString()}</span>
                    <span>•</span>
                    <div className="flex items-center gap-1">
                      <MessageSquare className="h-3 w-3" />
                      <span>{thread.reply_count} replies</span>
                    </div>
                    <span>•</span>
                    <div className="flex items-center gap-1">
                      <TrendingUp className="h-3 w-3" />
                      <span>{thread.view_count} views</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
