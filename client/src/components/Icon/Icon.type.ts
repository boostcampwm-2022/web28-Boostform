interface IconProps {
  type:
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
    | "multipleEmpty";
  size: string;
  fill?: string;
}

export default IconProps;
