import styled from "styled-components";

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 10px;
`;

const Button = styled.button`
  border: 0;
  background-color: transparent;
  cursor: pointer;

  &:active {
    transform: translateY(1px);
  }
`;

const NewFormButton = styled.button`
  display: flex;
  align-items: center;
  border: 1px solid ${({ theme }) => theme.colors.grey3};
  border-radius: 3px;
  margin-bottom: 10px;
  padding: 5px 15px;

  background-color: transparent;
  cursor: pointer;

  font-size: 16px;
  font-weight: 400;

  &:active {
    transform: translateY(1px);
  }
`;

const NewFormText = styled.span`
  margin-left: 4px;
`;

const Dropdown = styled.ul`
  position: absolute;
  top: 40px;
  right: -10px;
  z-index: 1;
  background-color: ${({ theme }) => theme.colors.white};
  padding: 10px 0;
  border-radius: 3px;
  border: 1px solid ${({ theme }) => theme.colors.grey3};

  li {
    width: 180px;
    text-align: left;

    &:hover {
      background-color: ${({ theme }) => theme.colors.grey1};
    }
  }
`;

const DropdownButton = styled.button`
  display: flex;
  align-items: center;
  padding: 10px;
  width: 100%;
  border: 0;
  background-color: transparent;
  cursor: pointer;
`;

const DropdownText = styled.span`
  margin-left: 8px;
`;

export { ButtonContainer, Button, NewFormButton, NewFormText, Dropdown, DropdownButton, DropdownText };
