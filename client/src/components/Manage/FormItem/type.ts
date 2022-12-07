import { FormItems, SelectedForm } from "types/manage";

interface ManageFormItemProps {
  formItem: FormItems;
  index: number;
  dropdowns: boolean[];
  setDropdowns: React.Dispatch<React.SetStateAction<boolean[]>>;
  setModalType: React.Dispatch<React.SetStateAction<string>>;
  setSelectedForm: React.Dispatch<React.SetStateAction<SelectedForm>>;
  openModal: () => void;
}

export default ManageFormItemProps;
