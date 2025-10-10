'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function AdminPanel() {
  const [selectedTab, setSelectedTab] = useState('overview')

  const stats = {
    totalUsers: 1247,
    activeApplications: 156,
    completedPrograms: 89,
    revenueThisMonth: 45680,
  }

  const recentApplications = [
    { id: 1, company: 'TechStart Inc', status: 'pending', score: 78, date: '2025-10-09' },
    { id: 2, company: 'HealthAI Labs', status: 'approved', score: 92, date: '2025-10-08' },
    { id: 3, company: 'EduTech Solutions', status: 'review', score: 65, date: '2025-10-07' },
    { id: 4, company: 'FinFlow', status: 'pending', score: 81, date: '2025-10-06' },
  ]

  const users = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'admin', status: 'active' },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane@example.com',
      role: 'mentor',
      status: 'active',
    },
    {
      id: 3,
      name: 'Bob Johnson',
      email: 'bob@example.com',
      role: 'founder',
      status: 'active',
    },
    {
      id: 4,
      name: 'Alice Williams',
      email: 'alice@example.com',
      role: 'reviewer',
      status: 'inactive',
    },
  ]

  const tabs = [
    { id: 'overview', name: 'Overview', icon: '📊' },
    { id: 'users', name: 'User Management', icon: '👥' },
    { id: 'applications', name: 'Applications', icon: '📝' },
    { id: 'analytics', name: 'Analytics', icon: '📈' },
    { id: 'settings', name: 'Settings', icon: '⚙️' },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold text-blue-600">
              PlatFormula.One
            </Link>
            <span className="px-3 py-1 bg-red-100 text-red-800 text-sm font-medium rounded">
              ADMIN
            </span>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Panel</h1>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow mb-8">
          <div className="flex border-b border-gray-200 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id)}
                className={`px-6 py-4 font-medium whitespace-nowrap ${
                  selectedTab === tab.id
                    ? 'border-b-2 border-blue-600 text-blue-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.name}
              </button>
            ))}
          </div>
        </div>

        {/* Overview Tab */}
        {selectedTab === 'overview' && (
          <div>
            {/* Stats Cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <StatCard title="Total Users" value={stats.totalUsers} color="blue" />
              <StatCard
                title="Active Applications"
                value={stats.activeApplications}
                color="green"
              />
              <StatCard
                title="Completed Programs"
                value={stats.completedPrograms}
                color="purple"
              />
              <StatCard
                title="Revenue (MTD)"
                value={`$${stats.revenueThisMonth.toLocaleString()}`}
                color="yellow"
              />
            </div>

            {/* Recent Activity */}
            <div className="grid lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold mb-4">Recent Applications</h2>
                <div className="space-y-3">
                  {recentApplications.map((app) => (
                    <div
                      key={app.id}
                      className="flex items-center justify-between p-3 border border-gray-200 rounded-lg"
                    >
                      <div>
                        <p className="font-medium text-gray-900">{app.company}</p>
                        <p className="text-sm text-gray-600">{app.date}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-semibold">{app.score}/100</span>
                        <span
                          className={`px-2 py-1 text-xs rounded ${
                            app.status === 'approved'
                              ? 'bg-green-100 text-green-800'
                              : app.status === 'pending'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-blue-100 text-blue-800'
                          }`}
                        >
                          {app.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
                <div className="space-y-3">
                  <button className="w-full px-4 py-3 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 text-left font-medium">
                    📧 Send Program Announcement
                  </button>
                  <button className="w-full px-4 py-3 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 text-left font-medium">
                    ✅ Approve Pending Applications
                  </button>
                  <button className="w-full px-4 py-3 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 text-left font-medium">
                    📊 Generate Monthly Report
                  </button>
                  <button className="w-full px-4 py-3 bg-yellow-50 text-yellow-700 rounded-lg hover:bg-yellow-100 text-left font-medium">
                    👥 Manage User Roles
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* User Management Tab */}
        {selectedTab === 'users' && (
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">User Management (RBAC)</h2>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  + Add User
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Role
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {users.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">{user.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                        {user.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded capitalize">
                          {user.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 py-1 text-xs rounded ${
                            user.status === 'active'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {user.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button className="text-blue-600 hover:text-blue-800 text-sm mr-3">
                          Edit
                        </button>
                        <button className="text-red-600 hover:text-red-800 text-sm">
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Analytics Tab */}
        {selectedTab === 'analytics' && (
          <div>
            <div className="bg-white rounded-lg shadow p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">Platform Analytics</h2>
              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-medium mb-2">User Growth</h3>
                  <div className="h-48 flex items-end justify-around gap-2">
                    {[45, 67, 89, 78, 95, 120, 134].map((height, i) => (
                      <div key={i} className="flex-1 flex flex-col items-center">
                        <div
                          className="w-full bg-blue-500 rounded-t"
                          style={{ height: `${(height / 134) * 100}%` }}
                        ></div>
                        <span className="text-xs mt-2 text-gray-600">W{i + 1}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h4 className="text-sm text-gray-600 mb-2">Conversion Rate</h4>
                    <p className="text-2xl font-bold text-green-600">23.5%</p>
                  </div>
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h4 className="text-sm text-gray-600 mb-2">Avg. Completion Time</h4>
                    <p className="text-2xl font-bold text-blue-600">4.2 days</p>
                  </div>
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h4 className="text-sm text-gray-600 mb-2">User Satisfaction</h4>
                    <p className="text-2xl font-bold text-purple-600">4.7/5.0</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
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
  value: number | string
  color: string
}) {
  const colorClasses = {
    blue: 'bg-blue-50 text-blue-600',
    green: 'bg-green-50 text-green-600',
    purple: 'bg-purple-50 text-purple-600',
    yellow: 'bg-yellow-50 text-yellow-600',
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
