import styled, { css } from "styled-components";

interface StyledButtonProps {
  color?: string;
  backgroundColor?: string;
  hover?: string;
  fontSize?: string;
  active?: boolean;
  border?: string;
  custom?: string;
}

const Button = styled.button<StyledButtonProps>`
  display: flex;
  align-items: center;
  background-color: ${({ backgroundColor }) => backgroundColor};
  color: ${({ color }) => color};
  border: ${({ border }) => (border === "none" ? "none" : `1px solid ${border}`)};
  font-weight: 400;
  font-size: ${({ fontSize }) => fontSize};
  padding: 8px 16px;
  border-radius: 3px;
  cursor: pointer;

  ${({ hover }) =>
    hover &&
    css`
      &:hover {
        background-color: ${hover};
      }
    `}

  ${({ active }) =>
    active &&
    css`
      &:active {
        transform: translateY(1px);
      }
    `}

    ${({ custom }) => custom}
`;

export default Button;
