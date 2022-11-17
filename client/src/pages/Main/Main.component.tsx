import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Header from "components/Header/Header.component";
import { AuthContext } from "contexts/authProvider";
import Example from "assets/Images/Example.png";

const Container = styled.section`
  display: flex;
  justify-content: space-between;
  margin: 0 32px;
  margin-top: 64px;
  min-width: 1024px;
`;

const TextContainer = styled.div`
  width: 50%;
  margin-left: auto;
`;

const H1 = styled.h1`
  font-size: 60px;
  margin-right: auto;
  user-select: none;
  max-width: 600px;
  line-height: 72px;
`;

const Text = styled.p`
  margin-top: 36px;
  font-size: 20px;
  color: #5f6368;
  line-height: 28px;
  user-select: none;
`;

const ImageContainer = styled.div`
  width: 50%;
  margin-left: 36px;
  user-select: none;
`;

const Button = styled.button`
  background-color: #0066cc;
  font-weight: 400;
  color: #ffffff;
  font-size: 15px;
  padding: 8px 16px;
  border: none;
  font-size: 18px;
  border-radius: 2px;
  margin-top: 24px;
  cursor: pointer;
  user-select: none;
`;

const Image = styled.img`
  width: 100%;
  min-width: 400px;
  max-width: 600px;
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
        <TextContainer>
          <H1>Boost Forms로 설문조사를 빠르게 작성하세요!</H1>
          <Text>온라인 양식과 설문조사를 손쉽게 만들고 공유할 수 있습니다.</Text>
          <Button type="button" onClick={handleClick}>
            시작하기
          </Button>
        </TextContainer>
        <ImageContainer>
          <Image src={Example} alt="example" draggable={false} />
        </ImageContainer>
      </Container>
    </>
  );
}

export default Main;
