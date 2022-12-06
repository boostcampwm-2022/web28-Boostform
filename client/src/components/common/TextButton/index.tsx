import React from "react";
import TextButtonComponent from "./style";

interface TextButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  color?: string;
  fontSize?: string;
  custom?: string;
}

function TextButton({ children, color, fontSize, custom, onClick }: TextButtonProps) {
  return (
    <TextButtonComponent color={color} fontSize={fontSize} onClick={onClick} custom={custom}>
      <span>{children}</span>
    </TextButtonComponent>
  );
}

TextButton.defaultProps = {
  color: "black",
  fontSize: "16px",
  custom: "",
};

export default TextButton;
