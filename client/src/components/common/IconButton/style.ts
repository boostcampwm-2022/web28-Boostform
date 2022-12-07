import styled, { css } from "styled-components";

interface StyledIconButtonProps {
  active?: boolean;
  custom?: string;
}

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
    background-color: ${({ theme }) => theme.colors.grey1};
    filter: brightness(90%);
  }

  ${({ active }) =>
    active &&
    css`
      &:active {
        transform: translateY(1px);
      }
    `}

  ${({ custom }) => custom}
`;

export default IconButton;
