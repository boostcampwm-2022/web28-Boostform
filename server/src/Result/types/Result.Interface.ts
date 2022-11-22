interface QuestionResult {
  type: "single" | "multiple" | "narrative";
  title: string;
  responseCount: number;
  answers: object;
}

interface TotalResult {
  totalResponseCount: number;
  acceptResponse: boolean;
  results: any;
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
  questionID: number;
  answer: string;
}

interface FormResponse {
  userID: number | null;
  formID: number;
  answers: Array<Answer>;
}

export { QuestionResult, TotalResult, TargetForm, FormResponse };
