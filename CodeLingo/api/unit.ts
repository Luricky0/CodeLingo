import apiClient from './axios';

export const getLatestUnit = async () => {
  const res = await apiClient.get('/unit/download');
  console.log(res)
  return res.data;
};
