'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function ResourceDirectory() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  const categories = [
    { id: 'all', name: 'All Resources' },
    { id: 'business', name: 'Business Planning' },
    { id: 'legal', name: 'Legal' },
    { id: 'funding', name: 'Funding' },
    { id: 'marketing', name: 'Marketing' },
    { id: 'technology', name: 'Technology' },
  ]

  const resources = [
    {
      id: 1,
      title: 'Business Model Canvas Template',
      category: 'business',
      type: 'Template',
      description: 'A comprehensive template to map out your business model',
      url: '#',
    },
    {
      id: 2,
      title: 'Startup Legal Checklist',
      category: 'legal',
      type: 'Guide',
      description: 'Essential legal steps for early-stage startups',
      url: '#',
    },
    {
      id: 3,
      title: 'Pitch Deck Examples',
      category: 'funding',
      type: 'Collection',
      description: 'Successful pitch decks from top startups',
      url: '#',
    },
    {
      id: 4,
      title: 'SEO Fundamentals for Startups',
      category: 'marketing',
      type: 'Course',
      description: 'Learn the basics of SEO to grow your online presence',
      url: '#',
    },
    {
      id: 5,
      title: 'MVP Development Guide',
      category: 'technology',
      type: 'Guide',
      description: 'How to build your minimum viable product efficiently',
      url: '#',
    },
    {
      id: 6,
      title: 'Financial Projections Template',
      category: 'business',
      type: 'Template',
      description: 'Create realistic financial projections for your startup',
      url: '#',
    },
    {
      id: 7,
      title: 'Term Sheet Breakdown',
      category: 'legal',
      type: 'Article',
      description: 'Understanding term sheets and investment agreements',
      url: '#',
    },
    {
      id: 8,
      title: 'Growth Marketing Strategies',
      category: 'marketing',
      type: 'Guide',
      description: 'Proven strategies to accelerate startup growth',
      url: '#',
    },
  ]

  const filteredResources = resources.filter((resource) => {
    const matchesSearch =
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory =
      selectedCategory === 'all' || resource.category === selectedCategory

    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <Link href="/" className="text-2xl font-bold text-blue-600">
            PlatFormula.One
          </Link>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Resource Directory</h1>

        {/* Search Bar */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <div className="flex gap-4">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search resources..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Search
            </button>
          </div>
        </div>

        {/* Category Filter */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Results Count */}
        <p className="text-gray-600 mb-4">
          Showing {filteredResources.length} of {resources.length} resources
        </p>

        {/* Resources Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResources.map((resource) => (
            <div
              key={resource.id}
              className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start justify-between mb-3">
                <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                  {resource.type}
                </span>
                <span className="text-xs text-gray-500 capitalize">
                  {resource.category}
                </span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {resource.title}
              </h3>
              <p className="text-gray-600 text-sm mb-4">{resource.description}</p>
              <a
                href={resource.url}
                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                Access Resource →
              </a>
            </div>
          ))}
        </div>

        {filteredResources.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No resources found matching your criteria</p>
          </div>
        )}
      </div>
    </div>
  )
}
