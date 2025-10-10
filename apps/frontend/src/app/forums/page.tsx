'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function Forums() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [threads] = useState([
    {
      id: 1,
      title: 'Best practices for pitch deck design',
      author: 'Sarah Johnson',
      category: 'fundraising',
      replies: 15,
      views: 234,
      lastActivity: '2 hours ago',
      isPinned: true,
    },
    {
      id: 2,
      title: 'How to validate product-market fit?',
      author: 'Mike Chen',
      category: 'product',
      replies: 8,
      views: 156,
      lastActivity: '4 hours ago',
      isPinned: false,
    },
    {
      id: 3,
      title: 'Legal structure for SaaS startup',
      author: 'Emily Rodriguez',
      category: 'legal',
      replies: 23,
      views: 445,
      lastActivity: '1 day ago',
      isPinned: false,
    },
    {
      id: 4,
      title: 'Customer acquisition strategies that worked',
      author: 'David Park',
      category: 'marketing',
      replies: 31,
      views: 678,
      lastActivity: '3 hours ago',
      isPinned: true,
    },
    {
      id: 5,
      title: 'Building a technical team on a budget',
      author: 'Lisa Wang',
      category: 'team',
      replies: 12,
      views: 289,
      lastActivity: '5 hours ago',
      isPinned: false,
    },
    {
      id: 6,
      title: 'When should I start talking to VCs?',
      author: 'James Miller',
      category: 'fundraising',
      replies: 19,
      views: 402,
      lastActivity: '6 hours ago',
      isPinned: false,
    },
  ])

  const categories = [
    { id: 'all', name: 'All Topics', icon: '💬' },
    { id: 'product', name: 'Product', icon: '🚀' },
    { id: 'fundraising', name: 'Fundraising', icon: '💰' },
    { id: 'marketing', name: 'Marketing', icon: '📢' },
    { id: 'legal', name: 'Legal', icon: '⚖️' },
    { id: 'team', name: 'Team Building', icon: '👥' },
  ]

  const filteredThreads = threads.filter(
    (thread) => selectedCategory === 'all' || thread.category === selectedCategory
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <Link href="/" className="text-2xl font-bold text-blue-600">
            PlatFormula.One
          </Link>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Community Forums</h1>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            + New Thread
          </button>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar Categories */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow p-4">
              <h2 className="font-semibold text-gray-900 mb-4">Categories</h2>
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                      selectedCategory === category.id
                        ? 'bg-blue-100 text-blue-800 font-medium'
                        : 'hover:bg-gray-100 text-gray-700'
                    }`}
                  >
                    <span className="mr-2">{category.icon}</span>
                    {category.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Forum Stats */}
            <div className="bg-white rounded-lg shadow p-4 mt-4">
              <h2 className="font-semibold text-gray-900 mb-4">Forum Stats</h2>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Threads</span>
                  <span className="font-semibold">1,234</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Posts</span>
                  <span className="font-semibold">8,567</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Active Users</span>
                  <span className="font-semibold">456</span>
                </div>
              </div>
            </div>
          </div>

          {/* Thread List */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow">
              {/* Search Bar */}
              <div className="p-4 border-b border-gray-200">
                <input
                  type="text"
                  placeholder="Search discussions..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Thread List */}
              <div className="divide-y divide-gray-200">
                {filteredThreads.map((thread) => (
                  <div
                    key={thread.id}
                    className="p-4 hover:bg-gray-50 cursor-pointer transition-colors"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          {thread.isPinned && (
                            <span className="text-blue-600" title="Pinned">
                              📌
                            </span>
                          )}
                          <h3 className="text-lg font-semibold text-gray-900 hover:text-blue-600">
                            {thread.title}
                          </h3>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <span>by {thread.author}</span>
                          <span className="px-2 py-1 bg-gray-100 rounded text-xs capitalize">
                            {thread.category}
                          </span>
                          <span>{thread.lastActivity}</span>
                        </div>
                      </div>
                      <div className="text-right space-y-1 text-sm">
                        <div className="text-gray-900 font-semibold">
                          {thread.replies} replies
                        </div>
                        <div className="text-gray-500">{thread.views} views</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              <div className="p-4 border-t border-gray-200 flex items-center justify-between">
                <button className="px-4 py-2 text-gray-600 hover:text-gray-900">
                  ← Previous
                </button>
                <div className="flex gap-2">
                  <button className="px-3 py-1 bg-blue-600 text-white rounded">1</button>
                  <button className="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded">
                    2
                  </button>
                  <button className="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded">
                    3
                  </button>
                </div>
                <button className="px-4 py-2 text-gray-600 hover:text-gray-900">
                  Next →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
