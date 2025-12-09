export enum AppState {
  WELCOME = 'WELCOME',
  INTRO_PRIME_2 = 'INTRO_PRIME_2',
  INTRO_PRIMES_OTHERS = 'INTRO_PRIMES_OTHERS',
  INTRO_COMPOSITE_4 = 'INTRO_COMPOSITE_4',
  INTRO_COMPOSITES_OTHERS = 'INTRO_COMPOSITES_OTHERS',
  COMPARISON = 'COMPARISON',
  QUIZ = 'QUIZ',
  VICTORY = 'VICTORY'
}

export interface NumberData {
  value: number;
  isPrime: boolean;
  factors: number[]; // e.g., for 4: [1, 2, 4]
  description?: string;
}

export interface QuizQuestion {
  number: number;
  isPrime: boolean;
}