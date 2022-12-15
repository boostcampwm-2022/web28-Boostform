import styled, { css } from "styled-components";
import { StyledIconButtonProps } from "./type";

const IconButton = styled.button<StyledIconButtonProps>`
  padding: 0;
  border: 0;
  border-radius: 3px;
  outline: none;
  background-color: transparent;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;

  &:hover {
    filter: brightness(90%);
  }

  &:disabled {
    cursor: not-allowed;
    filter: brightness(180%);
  }

  ${({ active }) =>
    active &&
    css`
      &:active {
        transform: translateY(1px);
      }
    `}
`;

export default IconButton;
