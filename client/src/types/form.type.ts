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

interface QuestionDataApi {
  questionId: number;
  page: number;
  type: QuestionType;
  essential: boolean;
  etcAdded: boolean;
  title: string;
  option: string[];
}

interface FormDataApi {
  id: string;
  userID: number;
  title: string;
  description: string;
  category: string;
  questionList: QuestionDataApi[];
  acceptResponse: boolean;
  onBoard: boolean;
}

export type { FormState, QuestionType, QuestionState, FormDataApi };
