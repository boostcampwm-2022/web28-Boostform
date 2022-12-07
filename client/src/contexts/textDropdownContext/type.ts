interface DropdownValueProps {
  open: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  selected?: string;
  setSelected?: React.Dispatch<React.SetStateAction<string>>;
  fontSize: string;
}

export default DropdownValueProps;
