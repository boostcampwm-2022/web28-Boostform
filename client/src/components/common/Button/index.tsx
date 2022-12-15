import React from "react";
import theme from "styles/theme";
import ButtonComponent from "./style";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  color?: string;
  backgroundColor?: string;
  hover?: string;
  fontSize?: string;
  active?: boolean;
  border?: string;
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
  onClick,
  style,
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
      onClick={onClick}
      style={style}
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
};

export default Button;
