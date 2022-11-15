interface CallFormListRequest {
  params: {
    page: number;
  };
}

interface CreateNewFormRequest {
  body: {
    userID: number;
  };
}

export { CallFormListRequest, CreateNewFormRequest };
