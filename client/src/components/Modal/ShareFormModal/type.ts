import { FormSummary } from "types/form";

interface ShareFormModalProps {
  formState: FormSummary;
  closeModal: () => void;
  changeLoginRequired: () => void;
  changeOnBoardShare: () => void;
  changeAcceptResponse: () => void;
  saveForm: () => void;
}

export default ShareFormModalProps;
