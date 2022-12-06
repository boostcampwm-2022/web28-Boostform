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

const DeleteButton = styled.button`
  background-color: transparent;
  border: 0;
  cursor: pointer;
  margin-left: 12px;
`;

const AddOptionButton = styled.button`
  border: 0;
  padding: 5px 0;
  background-color: transparent;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.grey5};
`;

const CheckIconButton = styled.button`
  margin: 0;
  padding: 0;
  background-color: transparent;
  border: 0;
`;

const QuestionTailButton = styled.button`
  border: 0;
  background-color: transparent;
  cursor: pointer;
  margin-right: 5px;

  &:active {
    transform: translateY(1px);
  }
`;

const Button = styled.button`
  border: 0;
  background-color: transparent;
  cursor: pointer;

  &:active {
    transform: translateY(1px);
  }
`;

export default IconButton;
