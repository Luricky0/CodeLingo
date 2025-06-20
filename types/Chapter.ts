import { UnitType } from './Unit';

export type ChapterType = {
  id: string;
  title: string;
  description?: string;
  units: UnitType[];
  nextChapterId?: string;
};
