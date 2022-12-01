import { QuestionType } from "types/form";

interface QuestionTypeDropdownProps {
  state: QuestionType;
  setState: (value: QuestionType) => void;
}

export default QuestionTypeDropdownProps;
