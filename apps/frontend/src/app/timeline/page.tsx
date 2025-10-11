'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function ProgramTimeline() {
  const [selectedMonth] = useState('October')
  const [events] = useState([
    {
      id: 1,
      title: 'Program Kickoff',
      date: '2025-10-01',
      time: '10:00 AM',
      type: 'milestone',
      description: 'Welcome session and program overview',
    },
    {
      id: 2,
      title: 'Business Model Workshop',
      date: '2025-10-05',
      time: '2:00 PM',
      type: 'workshop',
      description: 'Interactive session on business model canvas',
    },
    {
      id: 3,
      title: 'Application Deadline',
      date: '2025-10-15',
      time: '11:59 PM',
      type: 'deadline',
      description: 'Submit your complete application',
    },
    {
      id: 4,
      title: 'Mentor Matching Session',
      date: '2025-10-18',
      time: '3:00 PM',
      type: 'meeting',
      description: 'Meet your assigned mentors',
    },
    {
      id: 5,
      title: 'Pitch Practice',
      date: '2025-10-22',
      time: '1:00 PM',
      type: 'workshop',
      description: 'Practice your pitch with feedback',
    },
    {
      id: 6,
      title: 'Investor Demo Day',
      date: '2025-10-30',
      time: '9:00 AM',
      type: 'milestone',
      description: 'Present to investors and partners',
    },
  ])

  const getEventColor = (type: string) => {
    switch (type) {
      case 'milestone':
        return 'bg-purple-100 text-purple-800 border-purple-300'
      case 'workshop':
        return 'bg-blue-100 text-blue-800 border-blue-300'
      case 'deadline':
        return 'bg-red-100 text-red-800 border-red-300'
      case 'meeting':
        return 'bg-green-100 text-green-800 border-green-300'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300'
    }
  }

  const handleSyncCalendar = () => {
    alert('Calendar sync functionality - integrate with Google Calendar, Outlook, etc.')
  }

  const handleExportICS = () => {
    alert('Exporting events to ICS file format')
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
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Program Timeline</h1>
          <div className="flex gap-3">
            <button
              onClick={handleSyncCalendar}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
            >
              <span>🔄</span> Sync Calendar
            </button>
            <button
              onClick={handleExportICS}
              className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              Export ICS
            </button>
          </div>
        </div>

        {/* Calendar View */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">{selectedMonth} 2025</h2>
            <div className="flex gap-2">
              <button className="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded">
                ← Prev
              </button>
              <button className="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded">
                Next →
              </button>
            </div>
          </div>

          {/* Simple Calendar Grid */}
          <div className="grid grid-cols-7 gap-2">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
              <div key={day} className="text-center font-semibold text-gray-600 p-2">
                {day}
              </div>
            ))}
            {Array.from({ length: 35 }, (_, i) => {
              const day = i - 2 // Start on Wednesday (Oct 1)
              const isValidDay = day >= 1 && day <= 31
              const hasEvent = events.some(
                (event) => new Date(event.date).getDate() === day
              )
              return (
                <div
                  key={i}
                  className={`p-2 text-center rounded ${
                    isValidDay
                      ? hasEvent
                        ? 'bg-blue-100 text-blue-800 font-semibold cursor-pointer hover:bg-blue-200'
                        : 'hover:bg-gray-100 cursor-pointer'
                      : 'text-gray-300'
                  }`}
                >
                  {isValidDay ? day : ''}
                </div>
              )
            })}
          </div>
        </div>

        {/* Event List */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Upcoming Events</h2>
          <div className="space-y-4">
            {events.map((event) => (
              <div
                key={event.id}
                className={`border-l-4 p-4 rounded-r-lg ${getEventColor(event.type)}`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold">{event.title}</h3>
                      <span className="px-2 py-1 text-xs font-medium bg-white rounded capitalize">
                        {event.type}
                      </span>
                    </div>
                    <p className="text-sm mb-2">{event.description}</p>
                    <div className="flex items-center gap-4 text-sm">
                      <span>📅 {event.date}</span>
                      <span>⏰ {event.time}</span>
                    </div>
                  </div>
                  <button className="px-3 py-1 text-sm border border-current rounded hover:bg-white">
                    Add to Calendar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="mt-6 bg-white rounded-lg shadow p-4">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">Event Types</h3>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-purple-100 border border-purple-300 rounded"></div>
              <span className="text-sm text-gray-600">Milestone</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-blue-100 border border-blue-300 rounded"></div>
              <span className="text-sm text-gray-600">Workshop</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-red-100 border border-red-300 rounded"></div>
              <span className="text-sm text-gray-600">Deadline</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-100 border border-green-300 rounded"></div>
              <span className="text-sm text-gray-600">Meeting</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
