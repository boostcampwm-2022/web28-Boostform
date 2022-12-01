import { FormSummary } from "types/form";

interface ShareFormModalProps {
  formState: FormSummary;
  closeModal: () => void;
  changeLoginRequired: () => void;
  changeOnBoardShare: () => void;
  changeAcceptResponse: () => void;
  changeResponseModifiable: () => void;
  saveForm: () => void;
  copyLink: () => void;
}

export default ShareFormModalProps;
