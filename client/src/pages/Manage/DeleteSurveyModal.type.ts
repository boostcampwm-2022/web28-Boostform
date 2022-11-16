interface DeleteSurveyModalProps {
  closeModal: () => void;
  selectedSurvey: { id: string; index: number };
  renderByDeleteForm: (index: number) => void;
}

export default DeleteSurveyModalProps;
