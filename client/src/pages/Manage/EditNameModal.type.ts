interface EditNameModalProps {
  closeModal: () => void;
  selectedSurvey: { id: string; index: number };
  renderByNameChange: (index: number, title: string) => void;
}

export default EditNameModalProps;
