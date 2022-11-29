interface Validation {
  [key: string]: boolean;
}

type ResponseElement = {
  questionId: number;
  answer: string[];
};

export type { Validation, ResponseElement };
