import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Logo from "assets/Logo/Logo.png";
import Icon from "components/Icon/Icon.component";

const Container = styled.section`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;

  background-color: #3c64b1;
`;

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 600px;
  padding-top: 80px;
  padding-bottom: 60px;
  border: 1px solid #afafaf;
  border-radius: 9px;
  background-color: #ffffff;
`;

const OAuthButton = styled.button`
  width: 460px;
  display: flex;
  align-items: center;
  justify-content: center;

  background-color: black;
  border: none;
  color: white;
  margin-top: 36px;
  padding: 8px 16px;
  font-size: 16px;
  border-radius: 10px;
  cursor: pointer;
`;

const HomeButton = styled.button`
  width: 460px;

  background-color: #ddd;
  border: none;
  color: black;
  margin-top: 16px;
  padding: 8px 16px;
  font-size: 16px;
  border-radius: 10px;
  cursor: pointer;
`;

const ButtonText = styled.span`
  margin-left: 8px;
`;

function Login() {
  const navigate = useNavigate();

  const handleClickOAuth: React.MouseEventHandler<HTMLButtonElement> = async () => {
    window.location.href = `${process.env.REACT_APP_SERVER_ORIGIN_URL}/api/users/redirect`;
  };

  const handleClickHome: React.MouseEventHandler<HTMLButtonElement> = () => {
    navigate("/");
  };

  return (
    <Container>
      <LoginContainer>
        <Icon type="github" size="16px" />
        <img src={Logo} alt="logo" />
        <OAuthButton onClick={handleClickOAuth}>
          <Icon type="github" size="16px" />
          <ButtonText>깃허브 로그인</ButtonText>
        </OAuthButton>
        <HomeButton onClick={handleClickHome}>메인 화면으로 돌아가기</HomeButton>
      </LoginContainer>
    </Container>
  );
}

export default Login;
