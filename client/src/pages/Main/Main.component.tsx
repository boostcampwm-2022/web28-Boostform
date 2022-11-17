import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Header from "components/Header/Header.component";
import { AuthContext } from "contexts/authProvider";

import logo from "../../assets/Icon/plus.svg";

const Container = styled.section`
  padding: 20px;
  min-width: 1024px;
`;

const BodyContainer = styled.div`
  display: flex;
  padding: 20px;
  min-width: 1024px;
`;

const ContentsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 50%;
`;

const ServiceContents = styled.div`
  min-height: 256px;
  width: 90%;
  border: 1px solid #afafaf;
`;

const StartButton = styled.button`
  width: 256px;

  background-color: #ddd;
  border: none;
  color: black;
  margin-top: 10px;
  padding: 10px;
  font-size: 16px;
  border-radius: 10px;
`;

const ServiceImage = styled.img`
  width: 512px;
  height: 800px;

  border: 1px solid #afafaf;
`;

function Main() {
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = () => {
    const path = auth?.userID ? "/manage" : "/login";
    navigate(path);
  };

  return (
    <>
      <Header />
      <Container>
        <BodyContainer>
          <ContentsContainer>
            <ServiceContents>
              서비스 설명 <br />
              서비스 설명 ... <br />
              서비스 설명 ... ... <br />
              서비스 설명 ... ... ... <br />
              서비스 설명 ... ... ... ... <br />
            </ServiceContents>
            <StartButton onClick={handleClick}>시작하기</StartButton>
          </ContentsContainer>

          <ContentsContainer>
            <ServiceImage src={logo} />
          </ContentsContainer>
        </BodyContainer>
      </Container>
    </>
  );
}

export default Main;
