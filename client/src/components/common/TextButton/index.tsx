import React from "react";
import TextButtonComponent from "./style";
import { TextButtonProps } from "./type";

function TextButton({ children, color, fontSize, style, onClick }: TextButtonProps) {
  return (
    <TextButtonComponent color={color} fontSize={fontSize} onClick={onClick} style={style}>
      <span>{children}</span>
    </TextButtonComponent>
  );
}

TextButton.defaultProps = {
  color: "black",
  fontSize: "16px",
};

export default TextButton;
