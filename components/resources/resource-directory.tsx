"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, ExternalLink, BookOpen, FileText, Video, LinkIcon, Star } from "lucide-react"
import type { Resource } from "@/lib/types/database"

interface ResourceDirectoryProps {
  resources: Resource[]
  categories: string[]
}

const TYPE_ICONS = {
  article: FileText,
  guide: BookOpen,
  video: Video,
  template: FileText,
  playbook: BookOpen,
  tool: LinkIcon,
}

export function ResourceDirectory({ resources, categories }: ResourceDirectoryProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [selectedType, setSelectedType] = useState<string>("all")

  // Filter resources based on search and filters
  const filteredResources = useMemo(() => {
    return resources.filter((resource) => {
      const matchesSearch =
        searchQuery === "" ||
        resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        resource.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        resource.tags?.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

      const matchesCategory = selectedCategory === "all" || resource.category === selectedCategory

      const matchesType = selectedType === "all" || resource.type === selectedType

      return matchesSearch && matchesCategory && matchesType
    })
  }, [resources, searchQuery, selectedCategory, selectedType])

  // Get featured resources
  const featuredResources = resources.filter((r) => r.is_featured).slice(0, 3)

  // Get unique types
  const types = Array.from(new Set(resources.map((r) => r.type)))

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search resources by title, description, or tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
        </CardContent>
      </Card>

      {/* Featured Resources */}
      {featuredResources.length > 0 && searchQuery === "" && selectedCategory === "all" && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Featured Resources</h2>
          <div className="grid gap-4 md:grid-cols-3">
            {featuredResources.map((resource) => {
              const Icon = TYPE_ICONS[resource.type as keyof typeof TYPE_ICONS] || FileText
              return (
                <Card key={resource.id} className="border-primary/50">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <Icon className="h-5 w-5 text-primary" />
                      <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                    </div>
                    <CardTitle className="text-lg">{resource.title}</CardTitle>
                    <CardDescription className="line-clamp-2">{resource.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary">{resource.category}</Badge>
                      {resource.url && (
                        <Button asChild variant="ghost" size="sm">
                          <a href={resource.url} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      )}

      {/* Filters and Resources */}
      <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            {categories.map((category) => (
              <TabsTrigger key={category} value={category}>
                {category}
              </TabsTrigger>
            ))}
          </TabsList>

          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Type:</span>
            <div className="flex gap-1">
              <Button
                variant={selectedType === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedType("all")}
              >
                All
              </Button>
              {types.map((type) => (
                <Button
                  key={type}
                  variant={selectedType === type ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedType(type)}
                >
                  {type}
                </Button>
              ))}
            </div>
          </div>
        </div>

        <TabsContent value={selectedCategory} className="mt-6">
          {filteredResources.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredResources.map((resource) => {
                const Icon = TYPE_ICONS[resource.type as keyof typeof TYPE_ICONS] || FileText
                return (
                  <Card key={resource.id} className="hover:border-primary/50 transition-colors">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <Icon className="h-5 w-5 text-muted-foreground" />
                        <Badge variant="outline" className="text-xs">
                          {resource.type}
                        </Badge>
                      </div>
                      <CardTitle className="text-base">{resource.title}</CardTitle>
                      <CardDescription className="line-clamp-2">{resource.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {resource.tags && resource.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {resource.tags.slice(0, 3).map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      )}
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">{resource.view_count} views</span>
                        {resource.url && (
                          <Button asChild variant="outline" size="sm">
                            <a href={resource.url} target="_blank" rel="noopener noreferrer">
                              View Resource
                              <ExternalLink className="ml-2 h-3 w-3" />
                            </a>
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <BookOpen className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No resources found</h3>
                <p className="text-sm text-muted-foreground text-center">
                  Try adjusting your search or filters to find what you&apos;re looking for
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {categories.map((category) => (
          <TabsContent key={category} value={category} className="mt-6">
            {filteredResources.length > 0 ? (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {filteredResources.map((resource) => {
                  const Icon = TYPE_ICONS[resource.type as keyof typeof TYPE_ICONS] || FileText
                  return (
                    <Card key={resource.id} className="hover:border-primary/50 transition-colors">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <Icon className="h-5 w-5 text-muted-foreground" />
                          <Badge variant="outline" className="text-xs">
                            {resource.type}
                          </Badge>
                        </div>
                        <CardTitle className="text-base">{resource.title}</CardTitle>
                        <CardDescription className="line-clamp-2">{resource.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        {resource.tags && resource.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1">
                            {resource.tags.slice(0, 3).map((tag) => (
                              <Badge key={tag} variant="secondary" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        )}
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-muted-foreground">{resource.view_count} views</span>
                          {resource.url && (
                            <Button asChild variant="outline" size="sm">
                              <a href={resource.url} target="_blank" rel="noopener noreferrer">
                                View Resource
                                <ExternalLink className="ml-2 h-3 w-3" />
                              </a>
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            ) : (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <BookOpen className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No resources found</h3>
                  <p className="text-sm text-muted-foreground text-center">
                    Try adjusting your search or filters to find what you&apos;re looking for
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
