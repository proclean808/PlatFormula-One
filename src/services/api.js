// API Client Service for PlatFormula.One

const API_BASE_URL = window.location.origin + '/api';

class APIClient {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      credentials: 'include', // Important for session cookies
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Request failed');
      }

      return data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  // Auth endpoints
  async register(userData) {
    return this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async login(credentials) {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  }

  async logout() {
    return this.request('/auth/logout', {
      method: 'POST',
    });
  }

  async getCurrentUser() {
    return this.request('/auth/me');
  }

  async updateProfile(profileData) {
    return this.request('/auth/update-profile', {
      method: 'PUT',
      body: JSON.stringify(profileData),
    });
  }

  // Application endpoints
  async getApplications() {
    return this.request('/applications');
  }

  async createApplication(applicationData) {
    return this.request('/applications', {
      method: 'POST',
      body: JSON.stringify(applicationData),
    });
  }

  async getApplication(id) {
    return this.request(`/applications/${id}`);
  }

  async updateApplication(id, applicationData) {
    return this.request(`/applications/${id}`, {
      method: 'PUT',
      body: JSON.stringify(applicationData),
    });
  }

  async submitApplication(id) {
    return this.request(`/applications/${id}/submit`, {
      method: 'POST',
    });
  }

  // AI endpoints
  async improvePitch(pitch) {
    return this.request('/ai/improve-pitch', {
      method: 'POST',
      body: JSON.stringify({ pitch }),
    });
  }

  async generateContent(section, context) {
    return this.request('/ai/generate-content', {
      method: 'POST',
      body: JSON.stringify({ section, context }),
    });
  }

  // Form endpoints
  async submitContactForm(formData) {
    return this.request('/contact', {
      method: 'POST',
      body: JSON.stringify(formData),
    });
  }

  async joinWaitlist(email, name, company) {
    return this.request('/waitlist', {
      method: 'POST',
      body: JSON.stringify({ email, name, company }),
    });
  }

  // Payment endpoints
  async createPaymentIntent(amount, description) {
    return this.request('/payments/create-intent', {
      method: 'POST',
      body: JSON.stringify({ amount, description }),
    });
  }

  async confirmPayment(paymentId, transactionId) {
    return this.request(`/payments/${paymentId}/confirm`, {
      method: 'POST',
      body: JSON.stringify({ transaction_id: transactionId }),
    });
  }
}

export const apiClient = new APIClient();
export default apiClient;

