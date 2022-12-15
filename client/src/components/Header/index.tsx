import React, { useContext } from "react";
import { AuthContext } from "contexts/authProvider";
import { useNavigate, Link } from "react-router-dom";
import authApi from "api/authApi";
import Button from "components/common/Button";
import Logo from "assets/Icon/logo.svg";
import theme from "styles/theme";
import * as S from "./style";

function Header() {
  const { auth, setAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  const onClickLogin = () => {
    navigate("/login");
  };

  const onClickLogout = () => {
    if (!setAuth) return;
    authApi.logout();
    setAuth({ userId: "", userName: "" });
    navigate("/");
  };

  return (
    <S.HeaderContainer>
      <S.Layout>
        <Link to="/">
          <img src={Logo} alt="logo" width="120px" height="36px" draggable={false} />
        </Link>
        <S.LinkButtonWrapper>
          {auth?.userId && <Link to="/myForms">내 설문지</Link>}
          <Link to="/forum">게시판</Link>
          <a href="https://boostcamp-wm.notion.site/Web28-BoostForm-ebdeff01de9241c0a453742f42f1a633">프로젝트 소개</a>
          {auth?.userId && (
            <Button
              type="button"
              onClick={onClickLogout}
              backgroundColor={theme.colors.white}
              border={theme.colors.blue3}
              color={theme.colors.blue3}
              fontSize={theme.fontSize.sz14}
              active={false}
            >
              로그아웃
            </Button>
          )}
          {!auth?.userId && (
            <Button
              type="button"
              onClick={onClickLogin}
              backgroundColor={theme.colors.blue3}
              border="none"
              color={theme.colors.white}
              fontSize={theme.fontSize.sz16}
            >
              로그인
            </Button>
          )}
        </S.LinkButtonWrapper>
      </S.Layout>
    </S.HeaderContainer>
  );
}

export default Header;
