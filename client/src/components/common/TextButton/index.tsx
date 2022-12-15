import React from "react";
import TextButtonComponent from "./style";

interface TextButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  color?: string;
  fontSize?: string;
}

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
