"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MessageSquare, TrendingUp, Pin, Lock } from "lucide-react"
import Link from "next/link"
import type { ForumCategory, ForumThread, Profile } from "@/lib/types/database"

interface CategoryThreadsProps {
  category: ForumCategory
  threads: (ForumThread & { profiles: Profile })[]
}

export function CategoryThreads({ category, threads }: CategoryThreadsProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button asChild variant="outline">
          <Link href="/dashboard/forums">← Back to Forums</Link>
        </Button>
        <Button asChild>
          <Link href={`/dashboard/forums/new?category=${category.id}`}>New Thread</Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Discussions</CardTitle>
        </CardHeader>
        <CardContent>
          {threads.length > 0 ? (
            <div className="space-y-4">
              {threads.map((thread) => (
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
          ) : (
            <div className="text-center py-12">
              <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No discussions yet</h3>
              <p className="text-sm text-muted-foreground mb-4">Be the first to start a conversation!</p>
              <Button asChild>
                <Link href={`/dashboard/forums/new?category=${category.id}`}>Create Thread</Link>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
