interface EditFormNameModalProps {
  closeModal: () => void;
  selectedForm: { id: string; index: number };
  renderByNameChange: (index: number, title: string) => void;
}

export default EditFormNameModalProps;
