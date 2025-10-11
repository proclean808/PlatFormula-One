'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function Dashboard() {
  const [progress] = useState({
    applicationProgress: 65,
    readinessScore: 78,
    completedMilestones: 8,
    totalMilestones: 12,
  })

  const [upcomingDeadlines] = useState([
    { id: 1, title: 'Submit Business Plan', date: '2025-10-15', priority: 'high' },
    { id: 2, title: 'Financial Projections Review', date: '2025-10-18', priority: 'medium' },
    { id: 3, title: 'Pitch Deck Submission', date: '2025-10-22', priority: 'high' },
    { id: 4, title: 'Market Research Report', date: '2025-10-25', priority: 'low' },
  ])

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold text-blue-600">
              PlatFormula.One
            </Link>
            <div className="flex gap-4">
              <Link href="/dashboard" className="text-gray-700 hover:text-blue-600">
                Dashboard
              </Link>
              <Link href="/application" className="text-gray-700 hover:text-blue-600">
                Application
              </Link>
              <Link href="/resources" className="text-gray-700 hover:text-blue-600">
                Resources
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>

        {/* Progress Overview */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Application Progress"
            value={`${progress.applicationProgress}%`}
            color="blue"
          />
          <StatCard
            title="Readiness Score"
            value={`${progress.readinessScore}/100`}
            color="green"
          />
          <StatCard
            title="Completed Milestones"
            value={`${progress.completedMilestones}/${progress.totalMilestones}`}
            color="purple"
          />
          <StatCard
            title="Days to Deadline"
            value="5"
            color="red"
          />
        </div>

        {/* Progress Bar */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Overall Progress</h2>
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div
              className="bg-blue-600 h-4 rounded-full transition-all"
              style={{ width: `${progress.applicationProgress}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-600 mt-2">
            {progress.applicationProgress}% complete
          </p>
        </div>

        {/* Upcoming Deadlines */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Upcoming Deadlines</h2>
          <div className="space-y-4">
            {upcomingDeadlines.map((deadline) => (
              <div
                key={deadline.id}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
              >
                <div>
                  <h3 className="font-semibold text-gray-900">{deadline.title}</h3>
                  <p className="text-sm text-gray-600">{deadline.date}</p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    deadline.priority === 'high'
                      ? 'bg-red-100 text-red-800'
                      : deadline.priority === 'medium'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-green-100 text-green-800'
                  }`}
                >
                  {deadline.priority}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function StatCard({
  title,
  value,
  color,
}: {
  title: string
  value: string
  color: string
}) {
  const colorClasses = {
    blue: 'bg-blue-50 text-blue-600',
    green: 'bg-green-50 text-green-600',
    purple: 'bg-purple-50 text-purple-600',
    red: 'bg-red-50 text-red-600',
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-sm text-gray-600 mb-2">{title}</h3>
      <p className={`text-3xl font-bold ${colorClasses[color as keyof typeof colorClasses]}`}>
        {value}
      </p>
    </div>
  )
}
