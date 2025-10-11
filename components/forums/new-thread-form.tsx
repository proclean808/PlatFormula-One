"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"
import type { ForumCategory } from "@/lib/types/database"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"

interface NewThreadFormProps {
  userId: string
  categories: ForumCategory[]
  preselectedCategoryId?: string
}

export function NewThreadForm({ userId, categories, preselectedCategoryId }: NewThreadFormProps) {
  const [categoryId, setCategoryId] = useState(preselectedCategoryId || "")
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!categoryId || !title.trim() || !content.trim()) return

    setIsSubmitting(true)
    const supabase = createClient()

    try {
      const { data, error } = await supabase
        .from("forum_threads")
        .insert({
          category_id: categoryId,
          author_id: userId,
          title: title.trim(),
          content: content.trim(),
        })
        .select()
        .single()

      if (error) throw error

      router.push(`/dashboard/forums/thread/${data.id}`)
    } catch (error) {
      console.error("Error creating thread:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-6">
      <Button asChild variant="outline">
        <Link href="/dashboard/forums">← Cancel</Link>
      </Button>

      <Card>
        <CardHeader>
          <CardTitle>Thread Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select value={categoryId} onValueChange={setCategoryId}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                placeholder="What's your discussion about?"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="content">Content</Label>
              <Textarea
                id="content"
                placeholder="Share your thoughts, questions, or ideas..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={10}
                required
              />
            </div>

            <div className="flex gap-2">
              <Button type="submit" disabled={isSubmitting || !categoryId || !title.trim() || !content.trim()}>
                {isSubmitting ? "Creating..." : "Create Thread"}
              </Button>
              <Button type="button" variant="outline" asChild>
                <Link href="/dashboard/forums">Cancel</Link>
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
