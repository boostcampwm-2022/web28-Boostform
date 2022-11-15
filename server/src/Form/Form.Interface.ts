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

export { CallFormListRequest, CreateNewFormRequest };
