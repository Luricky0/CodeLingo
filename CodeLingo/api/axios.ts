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
    return config;
  },
  (error) => {
    console.log('Axios:', error);
    throw error;
  }
);

export default apiClient;
