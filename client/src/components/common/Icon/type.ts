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
  | "logo"
  | "left"
  | "right"
  | "bulletinBoard"
  | "form";

interface IconProps {
  type: IconType;
  size: string;
  fill?: string;
}

export type { IconProps, IconType };
