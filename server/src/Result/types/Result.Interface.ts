interface QuestionResult {
  type: "single" | "multiple" | "narrative";
  title: string;
  responseCount: number;
  answerTotal: any;
}

interface FormResult {
  totalResponseCount: number;
  acceptResponse: boolean;
  questionResultDict: any;
}

interface Question {
  type: "single" | "multiple" | "narrative";
  title: string;
  questionId: number;
  option: string[];
  essential: boolean;
  etcAdded: boolean;
  page?: number | undefined;
}

interface TargetForm {
  userID: number;
  title: string;
  question: Array<Question>;
  acceptResponse: boolean;
  onBoard: boolean;
}

interface Answer {
  questionId: number;
  answer: string;
}

interface FormResponse {
  userID: number | null;
  formId: number;
  answerList: Array<Answer>;
}

export { QuestionResult, FormResult, TargetForm, FormResponse };
