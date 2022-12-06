import styled from "styled-components";

const Container = styled.div`
  height: 24px;
`;

const Toggle = styled.div<{ toggle: boolean }>`
  position: relative;
  width: 42px;
  height: 24px;
  background: ${({ toggle, theme }) => (toggle ? theme.colors.blue3 : theme.colors.grey9)};
  border-radius: 30px;
`;

const Button = styled.div<{ toggle: boolean }>`
  position: absolute;
  top: 3px;
  left: ${({ toggle }) => (toggle ? "21px" : "3px")};
  width: 18px;
  height: 18px;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 50%;
  cursor: pointer;
  transition: 0.3s;
`;

export { Container, Toggle, Button };
