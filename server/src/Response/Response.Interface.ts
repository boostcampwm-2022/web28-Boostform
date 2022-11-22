interface AnswerInterface {
  id: number;
  answer: Array<string>;
}

interface ResponseInterface {
  user_id: number;
  form_id: string;
  answer_list: Array<AnswerInterface>;
}

export { AnswerInterface, ResponseInterface };
