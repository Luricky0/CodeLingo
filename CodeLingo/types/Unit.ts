import { Question } from "./Question";

export type UnitType = {
  id: string;
  chapterId: string;
  order: number;
  title: string;
  description?: string;
  questions: Question[];
  nextUnitId?: string;
};

export type UnitProgressType = {
  userId: string;
  unitId: string;
  isUnlocked: boolean;
  isCompleted: boolean;
  completedAt: Date;
};