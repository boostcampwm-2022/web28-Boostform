type QuestionType = "checkbox" | "multiple" | "paragraph";

interface FormSummary {
  id: string;
  userId: number;
  title: string;
  description: string;
  category: string;
  acceptResponse: boolean;
  onBoard: boolean;
  loginRequired: boolean;
  responseModifiable: boolean;
  currentQuestionId: number;
}

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
  form: FormSummary;
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
  loginRequired: boolean;
  responseModifiable: boolean;
}

export type { FormState, QuestionType, QuestionState, FormDataApi, FormSummary };
