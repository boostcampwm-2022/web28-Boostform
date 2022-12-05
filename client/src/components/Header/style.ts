import styled from "styled-components";

const Layout = styled.div`
  min-width: 1024px;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;

  a {
    text-decoration: none;
    color: ${({ theme }) => theme.colors.black};

    &:active {
      text-decoration: none;
    }
  }
`;

const HeaderContainer = styled.header`
  box-sizing: content-box;
  margin: 0 32px;
  padding: 20px 0;
  display: flex;
  background-color: white;
`;

const LoginButton = styled.button`
  background-color: ${({ theme }) => theme.colors.blue2};
  font-weight: 400;
  color: ${({ theme }) => theme.colors.white};
  font-size: 15px;
  padding: 8px 16px;
  border: none;
  border-radius: 2px;
  cursor: pointer;
`;

const LogoutButton = styled.button`
  border: 1px solid ${({ theme }) => theme.colors.blue2};
  font-weight: 400;
  color: ${({ theme }) => theme.colors.blue2};
  font-size: 15px;
  padding: 5px 10px;
  border-radius: 2px;
  cursor: pointer;
  background-color: #ffffff;
`;

export { HeaderContainer, LoginButton, LogoutButton, Layout };
