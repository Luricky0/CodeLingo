import axios from 'axios';
import { getDB } from 'database/db';
import { getToken } from 'database/user';

const apiClient = axios.create({
  baseURL: 'http://localhost:8080',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  async (config) => {
    const db = await getDB();
    const token = await getToken(db);
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  },
  (error) => {
    console.log('Axios:', error);
    return Promise.reject(error);
  }
);

export default apiClient;
