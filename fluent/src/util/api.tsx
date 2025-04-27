import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8081',
});

export function setAuthToken(token: string) {
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

export default api;
