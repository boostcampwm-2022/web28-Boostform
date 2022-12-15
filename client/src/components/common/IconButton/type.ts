import { IconType } from "components/common/Icon/type";

interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  type: "button" | "submit" | "reset";
  icon: IconType;
  fill?: string;
  size: string;
  active?: boolean;
  disabled?: boolean;
}

interface StyledIconButtonProps {
  active?: boolean;
}

export type { IconButtonProps, StyledIconButtonProps };
