import styled from "styled-components";

const Container = styled.div`
  position: relative;
  width: 150px;
`;

const Button = styled.button<{ fontSize: string; border: string; padding: string; color: string; bold: boolean }>`
  display: flex;
  padding: ${({ padding }) => padding};
  align-items: center;
  width: 100%;
  border: ${({ border }) => (border === "none" ? "none" : `1px solid ${border}`)};
  font-size: ${({ fontSize }) => fontSize};
  color: ${({ color }) => color};
  font-weight: ${({ bold }) => (bold ? 700 : 400)};
  border-radius: 3px;
  background-color: transparent;
  cursor: pointer;
`;

const Content = styled.ul`
  width: 100%;
  position: absolute;
  z-index: 1;
  background-color: ${({ theme }) => theme.colors.white};
  padding: 10px 0;
  border-radius: 3px;
  border: 1px solid ${({ theme }) => theme.colors.grey3};

  li {
    text-align: left;

    &:hover {
      background-color: ${({ theme }) => theme.colors.grey1};
    }
  }
`;

const DropdownButton = styled.button<{ fontSize: string }>`
  display: flex;
  align-items: center;
  padding: 10px;
  width: 100%;
  border: 0;
  background-color: transparent;
  font-size: ${({ fontSize }) => fontSize};
  cursor: pointer;
`;

const DropdownText = styled.span`
  width: 100%;
  text-align: left;
  margin-left: 8px;
`;

export { Container, Button, Content, DropdownButton, DropdownText };
