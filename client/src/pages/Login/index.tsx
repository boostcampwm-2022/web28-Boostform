import React from "react";
import { useNavigate } from "react-router-dom";
import Logo from "assets/Images/Logo.png";
import Icon from "components/Icon";
import { Container, LoginContainer, OAuthButton, HomeButton, ButtonText } from "./Login.style";

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
