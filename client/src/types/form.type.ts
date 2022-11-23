type QuestionType = "checkbox" | "multiple" | "paragraph";

interface QuestionState {
  questionId: number;
  currentChoiceId: number;
  page: number;
  type: QuestionType;
  essential: boolean;
  etcAdded: boolean;
  title: string;
  option: {
    choiceId: number;
    value: string;
  }[];
}

interface FormState {
  form: {
    id: string;
    userId: number;
    title: string;
    description: string;
    category: string;
    acceptResponse: boolean;
    onBoard: boolean;
    currentQuestionId: number;
  };
  question: QuestionState[];
}

export type { FormState, QuestionType, QuestionState };
