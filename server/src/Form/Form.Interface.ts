interface QuestionInRequestBody {
  questionID: number;
  page: number;
  type: string;
  title: string;
  option: Array<string>;
  essential: boolean;
  etcAdded: boolean;
}

interface QuestionInDB {
  question_id: number;
  page: number;
  type: string;
  title: string;
  option: Array<string>;
  essential: boolean;
  etc_added: boolean;
}

interface UpdateFormRequestBody {
  title: string;
  category: string;
  question: Array<QuestionInRequestBody>;
  acceptResponse: boolean;
  onBoard: boolean;
}

export { UpdateFormRequestBody, QuestionInRequestBody, QuestionInDB };
