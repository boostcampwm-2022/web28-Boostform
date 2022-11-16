interface CallFormListRequest {
  params: {
    userID: number;
    page: number;
  };
}

interface CreateNewFormRequest {
  body: {
    userID: number;
  };
}

interface UpdateFormRequestBody {
  title: string;
  category: string;
  question: Array<string>;
  acceptResponse: boolean;
  onBoard: boolean;
}

interface UpdateFormRequest {
  params: {
    id: string;
  };
  body: UpdateFormRequestBody;
}

interface DeleteFormRequest {
  params: {
    id: string;
  };
}

// // Schema Interface
// interface QuestionSchemaInterface extends Document {
//   question_id: number;
//   page: number;
//   title: string;
//   option: Array<string>;
//   essential: boolean;
//   etc_added: boolean;
// }

// interface FormSchemaInterface extends Document {
//   user_id: number;
//   title: string;
//   description: string;
//   category: string;
//   question: Array<QuestionSchemaInterface>;
//   accept_response: boolean;
//   on_board: boolean;
//   created_at: Date;
// }

export { CallFormListRequest, CreateNewFormRequest, UpdateFormRequest, UpdateFormRequestBody, DeleteFormRequest };
