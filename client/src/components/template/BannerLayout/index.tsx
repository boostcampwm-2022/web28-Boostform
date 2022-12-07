import React from "react";
import Banner from "assets/Images/Banner.png";
import Header from "components/Header";
import * as S from "./style";
import LayoutProps from "./type";

function BannerLayout({ children, backgroundColor, title, description }: LayoutProps) {
  return (
    <>
      <Header />
      <S.BannerContainer>
        <S.h1Title>{title}</S.h1Title>
        <S.pDescription>{description}</S.pDescription>
        <S.imgBanner alt="banner" src={Banner} />
      </S.BannerContainer>
      <S.Main backgroundColor={backgroundColor}>{children}</S.Main>
    </>
  );
}

export default BannerLayout;
