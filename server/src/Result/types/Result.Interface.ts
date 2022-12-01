interface QuestionResult {
  type: "single" | "multiple" | "narrative";
  title: string;
  responseCount: number;
  answerTotal: any;
}

interface FormResult {
  formTitle: string;
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
  question_id: number;
  answer: Array<string>;
}

interface Response {
  user_iD: number | null;
  form_id: number;
  answer_list: Array<Answer>;
}

export { QuestionResult, FormResult, TargetForm, Response, Answer };
