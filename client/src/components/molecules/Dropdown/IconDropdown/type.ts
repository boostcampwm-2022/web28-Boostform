import { IconType } from "components/atoms/Icon/type";
import { QuestionType } from "types/form";

interface IconItem {
  value: string;
  icon: IconType;
  text: string;
}

interface IconDropdownProps {
  defaultValue: string;
  state: string;
  setState: (value: string) => void;
  items: IconItem[];
}

export type { IconItem, IconDropdownProps };
