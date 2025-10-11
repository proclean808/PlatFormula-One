// Shared TypeScript types for the entire application

export interface User {
  id: string
  email: string
  name: string
  role: 'founder' | 'mentor' | 'reviewer' | 'admin'
  status: 'active' | 'inactive'
  createdAt: Date
}

export interface Application {
  id: string
  userId: string
  companyName: string
  description: string
  industry: string
  stage: string
  teamSize: number
  funding: string
  problem: string
  solution: string
  targetMarket: string
  competitors: string
  status: 'draft' | 'pending' | 'review' | 'approved' | 'rejected'
  score?: number
  createdAt: Date
  updatedAt: Date
}

export interface Resource {
  id: string
  title: string
  description: string
  category: 'business' | 'legal' | 'funding' | 'marketing' | 'technology'
  type: 'Template' | 'Guide' | 'Course' | 'Article' | 'Collection'
  url: string
  createdAt: Date
}

export interface ForumThread {
  id: string
  title: string
  content: string
  authorId: string
  author: string
  category: 'product' | 'fundraising' | 'marketing' | 'legal' | 'team'
  replies: number
  views: number
  isPinned: boolean
  createdAt: Date
  lastActivity: Date
}

export interface ForumReply {
  id: string
  threadId: string
  content: string
  authorId: string
  author: string
  createdAt: Date
}

export interface ReadinessScore {
  overall: number
  categories: {
    name: string
    score: number
    weight: number
  }[]
  recommendations: {
    category: string
    priority: 'high' | 'medium' | 'low'
    suggestion: string
  }[]
}

export interface Event {
  id: string
  title: string
  description: string
  date: Date
  time: string
  type: 'milestone' | 'workshop' | 'deadline' | 'meeting'
  location?: string
}

export interface Analytics {
  totalUsers: number
  activeApplications: number
  completedPrograms: number
  revenueThisMonth: number
  userGrowth: number[]
  conversionRate: number
  avgCompletionTime: number
  userSatisfaction: number
}
