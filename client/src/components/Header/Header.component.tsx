import React, { useContext } from "react";
import { AuthContext } from "contexts/authProvider";
import { useNavigate, Link } from "react-router-dom";
import authApi from "api/authApi";
import Logo from "assets/Images/Logo.png";
import { HeaderContainer, LoginButton, LogoutButton, Layout } from "./Header.style";

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
    <HeaderContainer>
      <Layout>
        <Link to="/">
          <img src={Logo} alt="logo" width="120px" draggable={false} />
        </Link>
        {auth?.userID && <Link to="/manage">내 설문조사</Link>}
        {auth?.userID && <Link to="/#">설문조사 게시판</Link>}
        {auth?.userID && (
          <LogoutButton type="button" onClick={onClickLogout}>
            로그아웃
          </LogoutButton>
        )}
        {!auth?.userID && (
          <LoginButton type="button" onClick={onClickLogin}>
            로그인
          </LoginButton>
        )}
      </Layout>
    </HeaderContainer>
  );
}

export default Header;
