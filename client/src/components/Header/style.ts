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
    color: #000000;

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
  background-color: #0066cc;
  font-weight: 400;
  color: #ffffff;
  font-size: 15px;
  padding: 8px 16px;
  border: none;
  border-radius: 2px;
  cursor: pointer;
`;

const LogoutButton = styled.button`
  border: 1px solid #0066cc;
  font-weight: 400;
  color: #0066cc;
  font-size: 15px;
  padding: 5px 10px;
  border-radius: 2px;
  cursor: pointer;
  background-color: #ffffff;
`;

export { HeaderContainer, LoginButton, LogoutButton, Layout };
