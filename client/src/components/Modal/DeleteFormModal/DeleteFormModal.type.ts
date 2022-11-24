interface DeleteFormModalProps {
  closeModal: () => void;
  selectedForm: { id: string; index: number };
  renderByDeleteForm: (index: number) => void;
}

export default DeleteFormModalProps;
