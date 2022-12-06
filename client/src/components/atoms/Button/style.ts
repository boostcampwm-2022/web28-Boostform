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

  ${({ custom }) => custom}

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
`;

export default Button;

/**
 * padding: 8px 16px;
 * padding: 5px 15px;
 * padding: 5px 0;
 * padding: 10px;
 * padding: 0;
 */

// const LoginButton = styled.button`
//   background-color: ${({ theme }) => theme.colors.blue2};
//   color: ${({ theme }) => theme.colors.white};
//   font-weight: 400;
//   font-size: 15px;
//   padding: 8px 16px;
//   border: none;
//   border-radius: 2px;
//   cursor: pointer;
// `;

// const LogoutButton = styled.button`
//   border: 1px solid ${({ theme }) => theme.colors.blue2};
//   font-weight: 400;
//   color: ${({ theme }) => theme.colors.blue2};
//   font-size: 15px;
//   padding: 5px 10px;
//   border-radius: 2px;
//   cursor: pointer;
//   background-color: #ffffff;
// `;

// const Button = styled.button`
//   font-size: 12px;
//   margin: 0 12px;
//   border: 1px solid ${({ theme }) => theme.colors.grey3};
//   background-color: ${({ theme }) => theme.colors.white};
//   border-radius: 12px;
//   padding: 5px 15px;
//   cursor: pointer;

//   &:hover {
//     background-color: ${({ theme }) => theme.colors.grey1};
//   }

//   &:active {
//     transform: translateY(1px);
//   }
// `;

// const Button2 = styled.button`
//   background-color: ${({ theme }) => theme.colors.blue5};
//   color: ${({ theme }) => theme.colors.white};
//   padding: 8px 16px;
//   border: 1px solid ${({ theme }) => theme.colors.grey3};
//   border-radius: 8px;
//   cursor: pointer;
//   margin-left: 16px;
// `;

// const DeleteButton = styled.button`
//   background-color: transparent;
//   border: 0;
//   cursor: pointer;
//   margin-left: 12px;
// `;

// const AddOptionButton = styled.button`
//   border: 0;
//   padding: 5px 0;
//   background-color: transparent;
//   cursor: pointer;
//   color: ${({ theme }) => theme.colors.grey5};
// `;

// const Button3 = styled.button`
//   display: flex;
//   padding: 10px;
//   align-items: center;
//   width: 100%;
//   height: 100%;
//   border: 1px solid ${({ theme }) => theme.colors.grey3};
//   border-radius: 3px;
//   background-color: transparent;
//   cursor: pointer;
// `;

// const CheckIconButton = styled.button`
//   margin: 0;
//   padding: 0;
//   background-color: transparent;
//   border: 0;
// `;

// const MultipleIconButton = styled.button`
//   margin: 0;
//   padding: 0;
//   background-color: transparent;
//   border: 0;
// `;

// const QuestionTailButton = styled.button`
//   border: 0;
//   background-color: transparent;
//   cursor: pointer;
//   margin-right: 5px;

//   &:active {
//     transform: translateY(1px);
//   }
// `;

// const buttonSearch = styled.button`
//   width: 65px;
//   height: 37px;
//   margin-left: 2px;
//   font-size: 12px;
//   background-color: ${({ theme }) => theme.colors.grey4};
//   border-radius: 3px;
//   border: 0;
//   color: ${({ theme }) => theme.colors.white};
//   cursor: pointer;
// `;

// const OAuthButton = styled.button`
//   width: 460px;
//   display: flex;
//   align-items: center;
//   justify-content: center;

//   background-color: black;
//   border: none;
//   color: ${({ theme }) => theme.colors.white};
//   margin-top: 36px;
//   padding: 8px 16px;
//   font-size: 16px;
//   border-radius: 10px;
//   cursor: pointer;
// `;

// const HomeButton = styled.button`
//   width: 460px;

//   background-color: ${({ theme }) => theme.colors.grey2};
//   border: none;
//   color: ${({ theme }) => theme.colors.black};
//   margin-top: 16px;
//   padding: 8px 16px;
//   font-size: 16px;
//   border-radius: 10px;
//   cursor: pointer;
// `;

// const Button5 = styled.button`
//   background-color: ${({ theme }) => theme.colors.blue2};
//   font-weight: 400;
//   color: ${({ theme }) => theme.colors.white};
//   font-size: 15px;
//   padding: 8px 16px;
//   border: none;
//   font-size: 18px;
//   border-radius: 2px;
//   margin-top: 24px;
//   cursor: pointer;
//   user-select: none;
// `;

// const Button6 = styled.button`
//   border: 0;
//   background-color: transparent;
//   cursor: pointer;

//   &:active {
//     transform: translateY(1px);
//   }
// `;

// const NewFormButton = styled.button`
//   display: flex;
//   align-items: center;
//   border: 1px solid ${({ theme }) => theme.colors.grey3};
//   border-radius: 9px;
//   margin-bottom: 10px;
//   padding: 5px 15px;

//   background-color: transparent;
//   cursor: pointer;

//   font-size: 16px;
//   font-weight: 400;

//   &:active {
//     transform: translateY(1px);
//   }
// `;

// const SubmitButton = styled.button`
//   background-color: ${({ theme }) => theme.colors.blue5};
//   color: ${({ theme }) => theme.colors.white};
//   padding: 8px 16px;
//   border: 1px solid ${({ theme }) => theme.colors.grey3};
//   border-radius: 8px;
//   cursor: pointer;
// `;
