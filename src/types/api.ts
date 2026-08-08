export type ApiGetProblemsResponse = {
  id: string;
  platform: string;
  title: string;
  url: string;
  tags: string[];
  difficulty?: number;
  ac_count: number;
  last_solved_at: string;
};

export type ApiGetActivityResponse = {
  date: string;
  ac_count: number;
  max_difficulty: number;
};

export type ApiGetArchivesResponse = {
  id: string;
  platform: string;
  title: string;
  url: string;
  tags: string[];
  difficulty?: number;
  archived_at: string;
};
