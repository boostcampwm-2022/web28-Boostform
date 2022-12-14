import React from "react";
import { useNavigate } from "react-router-dom";
import Logo from "assets/Images/Logo.png";
import Icon from "components/common/Icon";
import * as S from "./style";

function Login() {
  const navigate = useNavigate();

  const handleClickOAuth: React.MouseEventHandler<HTMLButtonElement> = async () => {
    window.location.href = `${process.env.REACT_APP_SERVER_ORIGIN_URL}/api/users/redirect`;
  };

  const handleClickHome: React.MouseEventHandler<HTMLButtonElement> = () => {
    navigate("/");
  };

  return (
    <S.Container>
      <S.LoginContainer>
        <Icon type="github" size="16px" />
        <S.Img src={Logo} alt="logo" draggable={false} />
        <S.OAuthButton onClick={handleClickOAuth}>
          <Icon type="github" size="16px" />
          <S.ButtonText>깃허브 로그인</S.ButtonText>
        </S.OAuthButton>
        <S.HomeButton onClick={handleClickHome}>메인 화면으로 돌아가기</S.HomeButton>
      </S.LoginContainer>
    </S.Container>
  );
}

export default Login;
