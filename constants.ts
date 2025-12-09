import { NumberData, QuizQuestion } from './types';

export const PRIME_COLOR = "bg-yellow-400 text-yellow-900 border-yellow-600";
export const COMPOSITE_COLOR = "bg-blue-400 text-blue-900 border-blue-600";

export const INTRO_2: NumberData = {
  value: 2,
  isPrime: true,
  factors: [1, 2],
  description: "我是数字 2！我是最小的素数。我只有两个朋友：1 和我自己！"
};

export const INTRO_4: NumberData = {
  value: 4,
  isPrime: false,
  factors: [1, 2, 4],
  description: "我是数字 4！我是合数。我可以被 2 整除，所以我有很多朋友！"
};

export const OTHER_PRIMES: number[] = [3, 5, 7, 11];
export const OTHER_COMPOSITES: number[] = [6, 8, 9, 10];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  { number: 5, isPrime: true },
  { number: 9, isPrime: false },
  { number: 13, isPrime: true },
  { number: 6, isPrime: false },
  { number: 3, isPrime: true },
  { number: 8, isPrime: false },
  { number: 7, isPrime: true },
  { number: 12, isPrime: false },
];