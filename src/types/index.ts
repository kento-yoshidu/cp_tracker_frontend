export * from "./api";

export type Problem = {
  id: string;
  platform: string;
  title: string;
  url: string;
  tags: string[];
  difficulty?: number;
  acCount: number;
  lastSolvedAt: string;
};

export type Activity = {
  date: string;
  acCount: number;
  maxDifficulty: number;
};

export type Archives = {
  id: string;
  platform: string;
  title: string;
  url: string;
  tags: string[];
  difficulty?: number;
  archivedAt: string;
};

export type CreateProblemInput = {
  platform: string;
  url: string;
  title: string;
  tags: string[];
  difficulty: number;
};

export type UpdateProblemInput = CreateProblemInput;

export type SnackBarState = {
  isOpen: boolean;
  title: string;
  variant: "success" | "error";
};
