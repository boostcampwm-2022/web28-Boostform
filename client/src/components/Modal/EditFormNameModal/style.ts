import styled from "styled-components";

const Container = styled.div`
  position: absolute;
  top: 35%;
  left: 50%;
  transform: translate(-50%, -50%);

  width: 400px;
  border-radius: 9px;
  padding: 24px;

  z-index: 2;
  background-color: ${({ theme }) => theme.colors.white};
`;

const Title = styled.h2`
  margin-bottom: 16px;
  font-size: 16px;
  font-weight: 400;
`;

const Text = styled.div`
  margin-bottom: 16px;
  font-size: 14px;
`;

const Input = styled.input`
  width: 100%;
  padding: 5px 10px;
  border: 1px solid ${({ theme }) => theme.colors.grey3};
  border-radius: 9px;
  margin-bottom: 24px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: right;
`;

const Button = styled.button`
  font-size: 12px;
  margin-left: 12px;
  border: 1px solid ${({ theme }) => theme.colors.grey3};
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 12px;
  padding: 5px 15px;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.grey1};
  }

  &:active {
    transform: translateY(1px);
  }
`;

export { Container, ButtonContainer, Button, Input, Title, Text };
