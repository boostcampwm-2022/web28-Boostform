type IconType =
  | "plus"
  | "kebab"
  | "trashcan"
  | "text"
  | "github"
  | "paragraph"
  | "checkbox"
  | "multiple"
  | "dropdown"
  | "checkboxEmpty"
  | "checkboxFull"
  | "close"
  | "copy"
  | "multipleEmpty"
  | "multipleFull"
  | "dragIndicator"
  | "add"
  | "error"
  | "chain"
  | "logo";

interface IconProps {
  type: IconType;
  size: string;
  fill?: string;
}

export type { IconProps, IconType };
