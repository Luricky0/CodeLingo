import { Question } from "./Question";

export type UnitType = {
  id: string;
  title: string;
  description?: string;
  questions: Question[];
  nextUnitId?: string;
};