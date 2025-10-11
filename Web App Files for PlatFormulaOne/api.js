// NexusYC API Service
const API_BASE_URL = 'http://localhost:5000/api'

class ApiService {
  constructor() {
    this.token = localStorage.getItem('access_token')
  }

  setToken(token) {
    this.token = token
    if (token) {
      localStorage.setItem('access_token', token)
    } else {
      localStorage.removeItem('access_token')
    }
  }

  getHeaders() {
    const headers = {
      'Content-Type': 'application/json',
    }
    
    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`
    }
    
    return headers
  }

  async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`
    const config = {
      headers: this.getHeaders(),
      ...options,
    }

    try {
      const response = await fetch(url, config)
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'API request failed')
      }

      return data
    } catch (error) {
      console.error('API Error:', error)
      throw error
    }
  }

  // Authentication
  async register(userData) {
    const response = await this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    })
    
    if (response.access_token) {
      this.setToken(response.access_token)
    }
    
    return response
  }

  async login(credentials) {
    const response = await this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    })
    
    if (response.access_token) {
      this.setToken(response.access_token)
    }
    
    return response
  }

  logout() {
    this.setToken(null)
  }

  // Profile Management
  async getProfile() {
    return this.request('/profile')
  }

  async updateProfile(profileData) {
    return this.request('/profile', {
      method: 'POST',
      body: JSON.stringify(profileData),
    })
  }

  // Matching
  async getMatches() {
    return this.request('/matches')
  }

  // Connections
  async sendConnectionRequest(recipientId, message) {
    return this.request('/connect', {
      method: 'POST',
      body: JSON.stringify({
        recipient_id: recipientId,
        message: message,
      }),
    })
  }

  async getConnections() {
    return this.request('/connections')
  }

  async respondToConnection(connectionId, status) {
    return this.request(`/connections/${connectionId}/respond`, {
      method: 'POST',
      body: JSON.stringify({ status }),
    })
  }

  // Health Check
  async healthCheck() {
    return this.request('/health')
  }
}

export default new ApiService()
