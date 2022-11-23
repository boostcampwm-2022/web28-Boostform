interface AnswerInterface {
  question_id: number;
  answer: Array<string>;
}

interface ResponseInterface {
  user_id: number;
  form_id: string;
  answer_list: Array<AnswerInterface>;
}

interface AnswerFromRequest {
  questionId: number;
  answer: Array<string>;
}

export { AnswerInterface, ResponseInterface, AnswerFromRequest };
