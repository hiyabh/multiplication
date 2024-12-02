export interface GameState {
  score: number;
  streak: number;
  highestStreak: number;
  selectedNumber: number | null;
  currentProblem: {
    multiplicand: number;
    multiplier: number;
    answer: number;
  } | null;
}

export interface GameStats {
  score: number;
  streak: number;
  highestStreak: number;
}