interface QuestionInRequestBody {
  questionId: number;
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

interface FormInDB {
  _id: string;
  user_id: number;
  title: string;
  description: string;
  category: string;
  question_list: Array<QuestionInDB>;
  accept_response: boolean;
  on_board: boolean;
  login_required: boolean;
  response_count: number;
  createdAt: Date;
  updatedAt: Date;
}

interface UpdateFormRequestBody {
  title: string;
  description: string;
  category: string;
  questionList: Array<QuestionInRequestBody>;
  acceptResponse: boolean;
  onBoard: boolean;
  loginRequired: boolean;
}

export { UpdateFormRequestBody, QuestionInRequestBody, QuestionInDB, FormInDB };
