import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Header from "components/organisms/Header";
import FormLayout from "components/organisms/Layout";
import Button from "components/atoms/Button";
import theme from "styles/theme";
import { AuthContext } from "contexts/authProvider";
import Example from "assets/Images/Example.png";
import * as S from "./style";

function Main() {
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleClick = () => {
    const path = auth?.userID ? "/manage" : "/login";
    navigate(path);
  };

  return (
    <>
      <Header />
      <FormLayout backgroundColor="white">
        <S.Container>
          <S.TextContainer>
            <S.H1>Boost Forms로 설문조사를 빠르게 작성하세요!</S.H1>
            <S.Text>온라인 양식과 설문조사를 손쉽게 만들고 공유할 수 있습니다.</S.Text>
            <Button
              type="button"
              onClick={() => handleClick()}
              backgroundColor={theme.colors.blue3}
              color={theme.colors.white}
              fontSize={theme.fontSize.sz16}
            >
              시작하기
            </Button>
          </S.TextContainer>
          <S.ImageContainer>
            <S.Image src={Example} alt="example" draggable={false} />
          </S.ImageContainer>
        </S.Container>
      </FormLayout>
    </>
  );
}

export default Main;
