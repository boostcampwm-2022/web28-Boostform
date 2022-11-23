interface QuestionInRequestBody {
  questionID: number;
  page: number;
  type: string;
  title: string;
  option: Array<string>;
  essential: boolean;
  etcAdded: boolean;
}

interface UpdateFormRequestBody {
  title: string;
  category: string;
  question: Array<QuestionInRequestBody>;
  acceptResponse: boolean;
  onBoard: boolean;
}

export { UpdateFormRequestBody, QuestionInRequestBody };
