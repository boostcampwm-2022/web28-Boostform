import { QuestionType } from "./form.type";

interface AnswerTotal {
  [key: string]: number;
}

interface QuestionSummary {
  type: QuestionType;
  title: string;
  responseCount: number;
  answerTotal: AnswerTotal;
}

interface ResultApi {
  formTitle: string;
  totalResponseCount: number;
  acceptResponse: "on" | "off";
  questionResultDict: {
    [key: number]: QuestionSummary;
  };
}

export type { ResultApi, QuestionSummary, AnswerTotal };
