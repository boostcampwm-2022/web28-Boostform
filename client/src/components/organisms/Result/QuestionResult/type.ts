import { QuestionType } from "types/form";
import { AnswerTotal } from "types/result";

interface QuestionResultProps {
  type: QuestionType;
  answerTotal: AnswerTotal;
}

export default QuestionResultProps;
