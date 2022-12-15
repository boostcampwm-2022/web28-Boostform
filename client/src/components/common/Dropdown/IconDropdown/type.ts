import { IconType } from "components/common/Icon/type";

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
