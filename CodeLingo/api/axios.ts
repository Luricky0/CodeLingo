import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:8080',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('codelingo-token');

    config.headers.Authorization = `Bearer ${token}`;

    console.log('Axios request:', config.url, config.headers);
    return config;
  },
  (error) => {
    console.log('Axios:', error);
    return Promise.reject(error);
  }
);

export default apiClient;
