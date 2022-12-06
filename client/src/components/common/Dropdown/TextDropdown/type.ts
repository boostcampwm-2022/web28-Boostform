interface TextDropdownProps {
  state: string;
  setState: (value: string) => void;
  items: string[];
  defaultState: string;
}

export default TextDropdownProps;
