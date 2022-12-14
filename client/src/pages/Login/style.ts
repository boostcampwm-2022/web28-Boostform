import styled from "styled-components";

const Container = styled.section`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;

  background-color: ${({ theme }) => theme.colors.blue3};
`;

const Img = styled.img`
  width: 50%;
  border-radius: 3px;
`;

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 600px;
  padding-top: 80px;
  padding-bottom: 60px;
  border: 1px solid ${({ theme }) => theme.colors.grey3};
  border-radius: 9px;
  background-color: ${({ theme }) => theme.colors.white};
`;

const OAuthButton = styled.button`
  width: 460px;
  display: flex;
  align-items: center;
  justify-content: center;

  background-color: black;
  border: none;
  color: ${({ theme }) => theme.colors.white};
  margin-top: 36px;
  padding: 8px 16px;
  font-size: 16px;
  border-radius: 10px;
  cursor: pointer;
`;

const HomeButton = styled.button`
  width: 460px;

  background-color: ${({ theme }) => theme.colors.grey2};
  border: none;
  color: ${({ theme }) => theme.colors.black};
  margin-top: 16px;
  padding: 8px 16px;
  font-size: 16px;
  border-radius: 10px;
  cursor: pointer;
`;

const ButtonText = styled.span`
  margin-left: 8px;
`;

export { Container, LoginContainer, OAuthButton, HomeButton, ButtonText, Img };
