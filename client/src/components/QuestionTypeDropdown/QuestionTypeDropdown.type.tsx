import { QuestionType } from "types/form.type";

interface QuestionTypeDropdownProps {
  state: QuestionType;
  setState: (value: QuestionType) => void;
}

export default QuestionTypeDropdownProps;
