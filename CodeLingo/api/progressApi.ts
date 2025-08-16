import { UnitProgressType } from '../types/Unit';
import apiClient from './axios';

export const uploadProgress = async (progresses: UnitProgressType[]) => {
  try {
    const res = await apiClient.post('/progress/upload', progresses);
    if(!res) return null
    return res.data
  } catch (error) {
    console.log(error);
  }
};
