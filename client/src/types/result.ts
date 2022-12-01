import { QuestionType } from "./form";

interface AnswerTotal {
  [key: string]: number;
}

interface QuestionSummary {
  type: QuestionType;
  questionTitle: string;
  responseCount: number;
  answerTotal: AnswerTotal;
}

interface ResultApi {
  formTitle: string;
  totalResponseCount: number;
  acceptResponse: boolean;
  questionResultDict: {
    [key: number]: QuestionSummary;
  };
}

export type { ResultApi, QuestionSummary, AnswerTotal };
