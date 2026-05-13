const API_BASE = '/api';

const api = {
  getToken: () => localStorage.getItem('token'),
  setToken: (token) => localStorage.setItem('token', token),
  removeToken: () => localStorage.removeItem('token'),
  getUser: () => JSON.parse(localStorage.getItem('user') || 'null'),
  setUser: (user) => localStorage.setItem('user', JSON.stringify(user)),
  removeUser: () => localStorage.removeItem('user'),

  async request(endpoint, options = {}) {
    const token = this.getToken();
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers
      },
      ...options
    };
    if (config.body && typeof config.body === 'object') {
      config.body = JSON.stringify(config.body);
    }
    try {
      const res = await fetch(`${API_BASE}${endpoint}`, config);
      const data = await res.json();
      if (!res.ok) {
        if (res.status === 401) {
          this.removeToken();
          this.removeUser();
          window.location.href = '/login.html';
        }
        throw new Error(data.message || 'Request failed');
      }
      return data;
    } catch (error) {
      throw error;
    }
  },

  // Auth
  register: (data) => api.request('/auth/register', { method: 'POST', body: data }),
  login: (data) => api.request('/auth/login', { method: 'POST', body: data }),
  forgotPassword: (data) => api.request('/auth/forgot-password', { method: 'POST', body: data }),
  getProfile: () => api.request('/auth/profile'),

  // Resume
  getResumes: () => api.request('/resume'),
  getResume: (id) => api.request(`/resume/${id}`),
  createResume: (data) => api.request('/resume/create', { method: 'POST', body: data }),
  updateResume: (id, data) => api.request(`/resume/update/${id}`, { method: 'PUT', body: data }),
  patchResumeSection: (id, section, data) => api.request(`/resume/patch/${id}`, { method: 'PATCH', body: { section, data } }),
  deleteResume: (id) => api.request(`/resume/delete/${id}`, { method: 'DELETE' }),

  // AI
  generateSummary: (data) => api.request('/ai/generate-summary', { method: 'POST', body: data }),
  improveContent: (data) => api.request('/ai/improve-content', { method: 'POST', body: data }),
  generateSkills: (data) => api.request('/ai/generate-skills', { method: 'POST', body: data }),
  generateCoverLetter: (data) => api.request('/ai/generate-cover-letter', { method: 'POST', body: data }),
  generateResume: (data) => api.request('/ai/generate-resume', { method: 'POST', body: data }),
  analyzeResume: (data) => api.request('/ai/analyze', { method: 'POST', body: data })
};

// Utility functions
function showToast(message, type = 'info') {
  const container = document.querySelector('.toast-container') || (() => {
    const c = document.createElement('div');
    c.className = 'toast-container';
    document.body.appendChild(c);
    return c;
  })();
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.textContent = message;
  container.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
}

function showAlert(element, message, type = 'error') {
  if (!element) return;
  element.textContent = message;
  element.className = `alert alert-${type} show`;
}

function hideAlert(element) {
  if (element) element.className = 'alert';
}

function debounce(fn, delay = 300) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

function getInitials(name) {
  return name ? name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) : '?';
}

function formatDate(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function formatDateShort(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
}
