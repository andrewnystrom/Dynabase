import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8081', // The Quarkus backend
});

export function setAuthToken(token: string) {
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

export function clearAuthToken() {
  delete api.defaults.headers.common['Authorization'];
}

export default api;
