import { QuestionState } from "types/form.type";

interface ObjectiveProps {
  index: number;
  questionState: QuestionState;
  addQuestionChoice: (idx: number) => void;
  modifyChoice: (questionIndex: number, choiceIndex: number, value: string) => void;
  deleteChoice: (questionIndex: number, choiceIndex: number) => void;
}

export default ObjectiveProps;
