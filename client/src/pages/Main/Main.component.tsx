import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Header from "components/Header/Header.component";
import { AuthContext } from "contexts/authProvider";
import Example from "assets/Images/Example.png";
import { Container, TextContainer, ImageContainer, H1, Image, Button, Text } from "./Main.style";

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
