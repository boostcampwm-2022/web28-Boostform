import React, { useContext } from "react";
import { AuthContext } from "contexts/authProvider";
import { useNavigate, Link } from "react-router-dom";
import authApi from "api/authApi";
import Logo from "assets/Icon/logo.svg";
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
          <S.LogoutButton type="button" onClick={onClickLogout}>
            로그아웃
          </S.LogoutButton>
        )}
        {!auth?.userID && (
          <S.LoginButton type="button" onClick={onClickLogin}>
            로그인
          </S.LoginButton>
        )}
      </S.Layout>
    </S.HeaderContainer>
  );
}

export default Header;
