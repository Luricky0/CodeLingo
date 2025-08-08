import { UnitType } from './Unit';

export type ChapterType = {
  id: string;
  lang: string;
  no: number;
  title: string;
  description?: string;
  units: UnitType[];
  nextChapterId?: string;
};
