import React from "react";
import Banner from "assets/Images/Banner.png";
import Header from "components/Header";
import * as S from "./style";
import ManageLayoutProps from "./type";

function ManageLayout({ children, backgroundColor }: ManageLayoutProps) {
  return (
    <>
      <Header />
      <S.BannerContainer>
        <S.h1Title>내 설문조사</S.h1Title>
        <S.pDescription>내가 만든 설문조사 확인하기</S.pDescription>
        <S.imgBanner alt="banner" src={Banner} />
      </S.BannerContainer>
      <S.Main backgroundColor={backgroundColor}>{children}</S.Main>
    </>
  );
}

export default ManageLayout;
