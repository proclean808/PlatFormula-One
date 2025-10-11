const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api'

export const api = {
  // Applications
  getApplications: async () => {
    const response = await fetch(`${API_URL}/applications`)
    return response.json()
  },

  createApplication: async (data: any) => {
    const response = await fetch(`${API_URL}/applications`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    return response.json()
  },

  updateApplication: async (id: string, data: any) => {
    const response = await fetch(`${API_URL}/applications/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    return response.json()
  },

  // Resources
  getResources: async (category?: string, search?: string) => {
    const params = new URLSearchParams()
    if (category) params.append('category', category)
    if (search) params.append('search', search)
    
    const response = await fetch(`${API_URL}/resources?${params}`)
    return response.json()
  },

  // Forums
  getThreads: async (category?: string) => {
    const params = category ? `?category=${category}` : ''
    const response = await fetch(`${API_URL}/forums/threads${params}`)
    return response.json()
  },

  createThread: async (data: any) => {
    const response = await fetch(`${API_URL}/forums/threads`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    return response.json()
  },

  // Analytics
  getDashboardAnalytics: async () => {
    const response = await fetch(`${API_URL}/analytics/dashboard`)
    return response.json()
  },
}
