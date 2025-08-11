import apiClient from './axios';

export const login = async (email: string, password: string) => {
  try {
    const res = await apiClient.post('/auth/login', { email, password });
    console.log('login', res.status, res.data);
    if (res.status === 200) return res.data.token;
    else return null;
  } catch (error) {
    console.log(error);
  }
};

export const register = async (email: string, password: string) => {
  try {
    const res = await apiClient.post('/auth/register', { email, password });
    console.log(res.status, res.data);
    if (res.status === 200) return res.data.token;
    else return null;
  } catch (error) {
    console.log(error);
  }
};
