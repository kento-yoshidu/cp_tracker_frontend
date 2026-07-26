export type Problems = {
  id: string;
  platform: string;
  title: string;
  url: string;
  tags: string[];
  difficulty?: number;
  ac_count: number;
  last_solved_at: string;
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
