export type Problem = {
  id: string;
  platform: string;
  title: string;
  url: string;
  tags: string[];
  difficulty?: number;
  ac_count: number;
  last_solved_at: string;
};

export type Activity = {
  date: string;
  ac_count: number;
  max_difficulty: number;
};

export type Archives = {
  id: string;
  platform: string;
  title: string;
  url: string;
  tags: string[];
  difficulty?: number;
  archived_at: string;
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
