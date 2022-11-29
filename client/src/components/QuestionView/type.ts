import { QuestionState, ResponseElement } from "types/form.type";

interface QuestionViewProps {
  questionState: QuestionState;
  addResponse: (response: ResponseElement) => void;
  deleteResponse: (questionId: number) => void;
  editResponse: (questionId: number, value: string[]) => void;
  responseState: ResponseElement[];
}

export default QuestionViewProps;
