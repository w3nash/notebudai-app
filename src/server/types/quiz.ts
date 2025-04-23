export type QuizQuestion = {
  question: string;
  choices: string[];
  correctIndex: number;
};

export type QuizData = QuizQuestion[];
