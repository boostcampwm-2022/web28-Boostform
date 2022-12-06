import React, { useContext } from "react";
import { AuthContext } from "contexts/authProvider";
import { useNavigate, Link } from "react-router-dom";
import authApi from "api/authApi";
import Button from "components/atoms/Button";
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
    setAuth({ userID: "", userName: "" });
    navigate("/");
  };

  return (
    <S.HeaderContainer>
      <S.Layout>
        <Link to="/">
          <img src={Logo} alt="logo" width="120px" height="36px" draggable={false} />
        </Link>
        {auth?.userID && <Link to="/manage">내 설문조사</Link>}
        {auth?.userID && <Link to="/forum">설문조사 게시판</Link>}
        {auth?.userID && (
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
        {!auth?.userID && (
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
      </S.Layout>
    </S.HeaderContainer>
  );
}

export default Header;
