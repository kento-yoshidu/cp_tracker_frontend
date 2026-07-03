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
