import { QuestionState } from "types/form";
import { ResponseElement, Validation } from "types/response";

interface QuestionViewProps {
  questionState: QuestionState;
  addResponse: (response: ResponseElement) => void;
  deleteResponse: (questionId: number) => void;
  editResponse: (questionId: number, value: string[]) => void;
  responseState: ResponseElement[];
  validationMode: boolean;
  validation: Validation;
  setValidation: React.Dispatch<React.SetStateAction<Validation>>;
}

interface IsEssential {
  isEssential: boolean;
}

export type { QuestionViewProps, IsEssential };
