import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "components/Layout";
import Header from "components/Header";
import boardApi from "api/board";
import { useQuery } from "@tanstack/react-query";
import * as S from "./style";

interface FormListApi {
  formId: string;
  title: string;
  category: string;
  responseCount: number;
}

function Forum() {
  const navigate = useNavigate();

  const [keyword, setKeyword] = useState("제");
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [orderBy, setOrderBy] = useState<"title" | "category" | "responseCount">("title");
  const [page, setPage] = useState(1);

  const fetchFormList = (): Promise<FormListApi[]> => boardApi.getFormList({ title: keyword, order, orderBy, page });
  const { data, refetch } = useQuery({ queryKey: ["ddd"], queryFn: fetchFormList, keepPreviousData: true });
  console.log(data);
  return (
    <>
      <Header />
      <Layout backgroundColor="white">
        <S.divContainer>
          <S.h1Title>설문조사 게시판</S.h1Title>
          <S.pDescription>다양한 설문조사를 만나보세요</S.pDescription>
          <S.divSearchBox>
            <S.inputSearch
              type="text"
              placeholder="검색어를 입력해주세요"
              onInput={(e) => setKeyword(e.currentTarget.value)}
            />
            <S.buttonSearch type="button" onClick={() => refetch()}>
              검색
            </S.buttonSearch>
          </S.divSearchBox>
          <S.divFormList>
            {data?.map(({ formId, title, category, responseCount }) => (
              <S.divFormItem key={formId}>
                <S.h3ItemTitle>{title}</S.h3ItemTitle>
                <div>
                  <S.spanItemDate>카테고리: {category}</S.spanItemDate>
                </div>
                <div>
                  <S.spanItemDate>응답 수: {responseCount}</S.spanItemDate>
                </div>
                <S.divItemButtonWrapper>
                  <S.buttonFormItem onClick={() => navigate(`/forms/${formId}/view`)}>
                    설문조사 참여하기
                  </S.buttonFormItem>
                  <S.buttonFormItem onClick={() => navigate(`/forms/${formId}/result`)}>
                    설문조사 결과보기
                  </S.buttonFormItem>
                </S.divItemButtonWrapper>
              </S.divFormItem>
            ))}
          </S.divFormList>
        </S.divContainer>
      </Layout>
    </>
  );
}

export default Forum;
