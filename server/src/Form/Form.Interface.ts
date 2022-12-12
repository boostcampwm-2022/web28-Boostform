interface QuestionDTOInterface {
  questionId: number;
  page: number;
  type: string;
  title: string;
  option: Array<string>;
  essential: boolean;
  etcAdded: boolean;
}

interface QuestionInterface {
  question_id: number;
  page?: number;
  type: string;
  title: string;
  option?: Array<string>;
  essential: boolean;
  etc_added: boolean;
}

interface FormDTOInterface {
  title: string;
  description: string;
  category: string;
  questionList: Array<QuestionDTOInterface>;
  acceptResponse: boolean;
  onBoard: boolean;
  loginRequired: boolean;
  responseModifiable: boolean;
}

interface FormInterface {
  _id: string;
  user_id: number;
  title: string;
  description?: string;
  category: string;
  question_list: Array<QuestionInterface>;
  accept_response: boolean;
  on_board: boolean;
  login_required: boolean;
  response_count: number;
  response_modifiable: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export { QuestionDTOInterface, QuestionInterface, FormDTOInterface, FormInterface };
