import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import authApi from "api/authApi";

// import AuthContext from "index";

import axios from "axios";
import logo from "../../assets/Icon/plus.svg";

const Container = styled.section`
  width: 100%;
  height: 100vh;

  display: flex;
  align-items: center;
  justify-content: center;
`;

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  min-width: 512px;
  min-height: 256px;
  border: 1px solid #afafaf;
  border-radius: 10px;
`;

const ProjectLogo = styled.img`
  width: 256px;
  height: 256px;
`;

const OAuthButton = styled.button`
  width: 256px;

  background-color: black;
  border: none;
  color: white;
  margin: 8px;
  padding: 10px;
  font-size: 16px;
  border-radius: 10px;
`;

const HomeButton = styled.button`
  width: 256px;

  background-color: #ddd;
  border: none;
  color: black;
  margin: 8px;
  padding: 10px;
  font-size: 16px;
  border-radius: 10px;
`;

function Login() {
  // const userInfo = useContext(AuthContext);
  const navigate = useNavigate();

  const handleClickOAuth: React.MouseEventHandler<HTMLButtonElement> = async () => {
    // userInfo.userID = "testID-01";
    window.location.href = `${process.env.REACT_APP_SERVER_ORIGIN_URL}/api/users/redirect`;
    // await authApi.login();
  };

  const handleClickHome: React.MouseEventHandler<HTMLButtonElement> = () => {
    navigate("/");
  };

  return (
    <Container>
      <LoginContainer>
        <ProjectLogo src={logo} />
        <OAuthButton onClick={handleClickOAuth}>Sign in with GitHub</OAuthButton>
        <HomeButton onClick={handleClickHome}>메인 화면으로 돌아가기</HomeButton>
      </LoginContainer>
    </Container>
  );
}

export default Login;
