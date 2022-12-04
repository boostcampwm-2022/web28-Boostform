import React from "react";
import Layout from "components/Layout";
import Header from "components/Header";
import * as S from "./style";

function Forum() {
  const domId = "hello";

  return (
    <>
      <Header />
      <Layout backgroundColor="white">
        <S.divContainer>
          <S.h1Title>설문조사 게시판</S.h1Title>
          <S.pDescription>다양한 설문조사를 만나보세요</S.pDescription>
          <S.divSearchBox>
            <S.inputSearch type="text" placeholder="검색어를 입력해주세요" />
            <S.buttonSearch type="button">검색</S.buttonSearch>
          </S.divSearchBox>
          <S.divFormList>
            <S.divFormItem>
              <S.h3ItemTitle>점기요금 교육 후 인지조사</S.h3ItemTitle>
              <S.spanItemDate>등록일: 2020-10-26</S.spanItemDate>
              <S.divItemButtonWrapper>
                <S.buttonFormItem>설문조사 참여하기</S.buttonFormItem>
                <S.buttonFormItem>설문조사 결과보기</S.buttonFormItem>
              </S.divItemButtonWrapper>
            </S.divFormItem>
          </S.divFormList>
        </S.divContainer>
      </Layout>
    </>
  );
}

export default Forum;
