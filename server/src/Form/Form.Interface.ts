// Request Interface
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

export { CallFormListRequest, CreateNewFormRequest, UpdateFormRequest, UpdateFormRequestBody, DeleteFormRequest };
