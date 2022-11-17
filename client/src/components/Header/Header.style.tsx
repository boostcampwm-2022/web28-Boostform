import styled from "styled-components";

const HeaderContainer = styled.header`
  box-sizing: content-box;
  min-width: 1024px;
  margin: 0 32px;
  padding: 20px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: white;

  a {
    text-decoration: none;
    color: #000000;

    &:active {
      text-decoration: none;
    }
  }
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

export { HeaderContainer, LoginButton, LogoutButton };
