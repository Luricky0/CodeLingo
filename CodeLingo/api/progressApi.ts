import { UnitProgressType } from '../types/Unit';
import apiClient from './axios';

export const uploadProgress = async (progresses: UnitProgressType[]) => {
  try {
    await apiClient.post('/progress/upload', progresses);
  } catch (error) {
    console.log(error);
  }
};
