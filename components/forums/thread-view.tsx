"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { MessageSquare, Pin, Lock, CheckCircle2 } from "lucide-react"
import Link from "next/link"
import type { ForumThread, ForumReply, Profile } from "@/lib/types/database"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"

interface ThreadViewProps {
  thread: ForumThread & { profiles: Profile }
  replies: (ForumReply & { profiles: Profile })[]
  currentUserId: string
}

export function ThreadView({ thread, replies, currentUserId }: ThreadViewProps) {
  const [replyContent, setReplyContent] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  const handleSubmitReply = async () => {
    if (!replyContent.trim()) return

    setIsSubmitting(true)
    const supabase = createClient()

    try {
      const { error } = await supabase.from("forum_replies").insert({
        thread_id: thread.id,
        author_id: currentUserId,
        content: replyContent,
      })

      if (error) throw error

      setReplyContent("")
      router.refresh()
    } catch (error) {
      console.error("Error posting reply:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const getInitials = (name: string | null) => {
    if (!name) return "U"
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  return (
    <div className="space-y-6">
      <Button asChild variant="outline">
        <Link href="/dashboard/forums">← Back to Forums</Link>
      </Button>

      {/* Thread */}
      <Card>
        <CardHeader>
          <div className="flex items-start gap-4">
            <Avatar className="h-12 w-12">
              <AvatarImage src={thread.profiles.avatar_url || undefined} />
              <AvatarFallback>{getInitials(thread.profiles.full_name)}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                {thread.is_pinned && <Pin className="h-4 w-4 text-primary" />}
                {thread.is_locked && <Lock className="h-4 w-4 text-muted-foreground" />}
                <CardTitle className="text-2xl">{thread.title}</CardTitle>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>by {thread.profiles.full_name || "Anonymous"}</span>
                <span>•</span>
                <span>{new Date(thread.created_at).toLocaleDateString()}</span>
                <span>•</span>
                <div className="flex items-center gap-1">
                  <MessageSquare className="h-3 w-3" />
                  <span>{thread.reply_count} replies</span>
                </div>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-base whitespace-pre-wrap">{thread.content}</p>
        </CardContent>
      </Card>

      {/* Replies */}
      <Card>
        <CardHeader>
          <CardTitle>Replies ({replies.length})</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {replies.map((reply) => (
            <div key={reply.id} className="flex gap-4 pb-6 border-b last:border-0 last:pb-0">
              <Avatar className="h-10 w-10">
                <AvatarImage src={reply.profiles.avatar_url || undefined} />
                <AvatarFallback>{getInitials(reply.profiles.full_name)}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-semibold">{reply.profiles.full_name || "Anonymous"}</span>
                  {reply.is_solution && (
                    <Badge variant="default" className="gap-1">
                      <CheckCircle2 className="h-3 w-3" />
                      Solution
                    </Badge>
                  )}
                  <span className="text-sm text-muted-foreground">
                    {new Date(reply.created_at).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-sm whitespace-pre-wrap">{reply.content}</p>
              </div>
            </div>
          ))}

          {replies.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <MessageSquare className="h-12 w-12 mx-auto mb-2 opacity-50" />
              <p>No replies yet. Be the first to respond!</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Reply Form */}
      {!thread.is_locked && (
        <Card>
          <CardHeader>
            <CardTitle>Post a Reply</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              placeholder="Share your thoughts..."
              value={replyContent}
              onChange={(e) => setReplyContent(e.target.value)}
              rows={5}
            />
            <Button onClick={handleSubmitReply} disabled={isSubmitting || !replyContent.trim()}>
              {isSubmitting ? "Posting..." : "Post Reply"}
            </Button>
          </CardContent>
        </Card>
      )}

      {thread.is_locked && (
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Lock className="h-5 w-5" />
              <p>This thread is locked. No new replies can be posted.</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
