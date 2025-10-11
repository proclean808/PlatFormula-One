'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function ReadinessScore() {
  const [scores] = useState({
    overall: 78,
    categories: [
      { name: 'Business Model', score: 85, weight: 20 },
      { name: 'Market Validation', score: 72, weight: 20 },
      { name: 'Team Strength', score: 80, weight: 15 },
      { name: 'Financial Health', score: 65, weight: 15 },
      { name: 'Product Development', score: 88, weight: 15 },
      { name: 'Go-to-Market Strategy', score: 75, weight: 15 },
    ],
  })

  const [recommendations] = useState([
    {
      category: 'Financial Health',
      priority: 'high',
      suggestion: 'Develop more detailed financial projections for the next 18 months',
    },
    {
      category: 'Market Validation',
      priority: 'medium',
      suggestion: 'Conduct customer interviews to validate product-market fit',
    },
    {
      category: 'Go-to-Market Strategy',
      priority: 'medium',
      suggestion: 'Define clearer customer acquisition channels and costs',
    },
  ])

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600 bg-green-50'
    if (score >= 60) return 'text-yellow-600 bg-yellow-50'
    return 'text-red-600 bg-red-50'
  }

  const getOverallScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600'
    if (score >= 60) return 'text-yellow-600'
    return 'text-red-600'
  }

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
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          AI-Powered Readiness Assessment
        </h1>

        {/* Overall Score */}
        <div className="bg-white rounded-lg shadow p-8 mb-8 text-center">
          <h2 className="text-xl text-gray-600 mb-4">Your Overall Readiness Score</h2>
          <div className={`text-7xl font-bold mb-4 ${getOverallScoreColor(scores.overall)}`}>
            {scores.overall}
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
            <div
              className="bg-blue-600 h-4 rounded-full transition-all"
              style={{ width: `${scores.overall}%` }}
            ></div>
          </div>
          <p className="text-gray-600">
            {scores.overall >= 80
              ? 'Excellent! Your startup is highly ready for acceleration.'
              : scores.overall >= 60
              ? 'Good progress! Focus on the recommendations below to improve.'
              : 'Keep working! Address the key areas highlighted below.'}
          </p>
        </div>

        {/* Category Scores */}
        <div className="bg-white rounded-lg shadow p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Category Breakdown
          </h2>
          <div className="space-y-6">
            {scores.categories.map((category, index) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <span className="text-lg font-medium text-gray-900">
                      {category.name}
                    </span>
                    <span className="text-sm text-gray-500">
                      (Weight: {category.weight}%)
                    </span>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${getScoreColor(
                      category.score
                    )}`}
                  >
                    {category.score}/100
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className={`h-3 rounded-full transition-all ${
                      category.score >= 80
                        ? 'bg-green-500'
                        : category.score >= 60
                        ? 'bg-yellow-500'
                        : 'bg-red-500'
                    }`}
                    style={{ width: `${category.score}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Recommendations */}
        <div className="bg-white rounded-lg shadow p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            AI-Powered Recommendations
          </h2>
          <div className="space-y-4">
            {recommendations.map((rec, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50"
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-gray-900">{rec.category}</h3>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      rec.priority === 'high'
                        ? 'bg-red-100 text-red-800'
                        : rec.priority === 'medium'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-green-100 text-green-800'
                    }`}
                  >
                    {rec.priority} priority
                  </span>
                </div>
                <p className="text-gray-600">{rec.suggestion}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800">
              💡 <strong>Tip:</strong> These recommendations are generated by our AI engine
              based on your application data. Complete more sections to get more personalized
              insights.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
