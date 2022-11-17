interface UpdateFormRequestBody {
  title: string;
  category: string;
  question: Array<string>;
  acceptResponse: boolean;
  onBoard: boolean;
}

export default UpdateFormRequestBody;
