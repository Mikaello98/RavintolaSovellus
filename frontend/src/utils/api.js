import axios from 'axios';
import { useAuth } from '../context/AuthContext';

export function useApi() {
  const user = useAuth();

  const apiFetch = async (url, options = {}) => {
    const token = user?.token;

    const headers = {
      'Content-Type': 'application/json',
      ...api(options.headers || {}),
      ...api(token ? { Authorization: `Bearer ${token}` } : {}),
    };

    const res = await fetch(url, {
      ...options,
      headers,
    });

    return res.json();
  };

  return { apiFetch };
}

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
});

api.interceptors.request.use((config) => {
  const raw = localStorage.getItem('user');
  if (raw) {
    try {
      const user = JSON.parse(raw);
      if (user?.token) {
        config.headers.Authorization = `Bearer ${user.token}`;
      }
    } catch (e) {
      // ignoring parse error
    }
  }
  return config;
});

export default api;