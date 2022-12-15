import styled from "styled-components";
import { StyledTextButtonProps } from "./type";

const TextButtonComponent = styled.button<StyledTextButtonProps>`
  border: 0px;
  outline: none;
  margin: 0px;
  padding: 0;
  background: none;
  cursor: pointer;
  letter-spacing: -0.2px;
  color: ${({ color }) => color};
  font-size: ${({ fontSize }) => fontSize};

  &:hover {
    text-decoration: underline;
    filter: brightness(85%);
  }
`;

export default TextButtonComponent;
