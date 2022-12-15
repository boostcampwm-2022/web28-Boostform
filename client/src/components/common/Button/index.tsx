import React from "react";
import theme from "styles/theme";
import ButtonComponent from "./style";
import { ButtonProps } from "./type";

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
