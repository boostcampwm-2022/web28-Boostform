import React from "react";
import theme from "styles/theme";
import ButtonComponent from "./style";

interface ButtonProps {
  children: React.ReactNode;
  type: "button" | "submit" | "reset";
  color?: string;
  backgroundColor?: string;
  hover?: string;
  fontSize?: string;
  active?: boolean;
  border?: string;
  custom?: string;
  onClick: () => void;
}

function Button({
  children,
  type,
  backgroundColor,
  border,
  fontSize,
  color,
  hover,
  active,
  custom,
  onClick,
}: ButtonProps) {
  return (
    <ButtonComponent
      type={type}
      backgroundColor={backgroundColor}
      border={border}
      fontSize={fontSize}
      color={color}
      hover={hover}
      active={active}
      custom={custom}
      onClick={onClick}
    >
      {children}
    </ButtonComponent>
  );
}

Button.defaultProps = {
  backgroundColor: "transparent",
  border: "none",
  fontSize: theme.fontSize.sz14,
  color: theme.colors.black,
  hover: "",
  active: false,
  custom: "",
};

export default Button;
