import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "components/Layout";
import Header from "components/Header";
import boardApi from "api/forumApi";
import { useQuery } from "@tanstack/react-query";
import CategoryDropdown from "components/CategoryDropdown";
import { ForumCategory, OrderBy } from "types/forum";
import * as S from "./style";

interface FormListApi {
  formId: string;
  title: string;
  category: string;
  responseCount: number;
}

function Forum() {
  const navigate = useNavigate();

  const [keyword, setKeyword] = useState("t");
  const [category, setCategory] = useState<ForumCategory>("전체");
  const [orderBy, setOrderBy] = useState<OrderBy>("latestAsc");
  const [page, setPage] = useState(1);

  const fetchFormList = (): Promise<FormListApi[]> => boardApi.getFormList({ title: keyword, category, orderBy, page });
  const { data, refetch } = useQuery({ queryKey: ["ddd"], queryFn: fetchFormList, keepPreviousData: true });

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
          <S.divSortWrapper>
            <S.divSortList>
              <S.inputRadio
                type="radio"
                id="latestAsc"
                value="latestAsc"
                checked={orderBy === "latestAsc"}
                onChange={() => setOrderBy("latestAsc")}
              />
              <S.labelRadio htmlFor="latestAsc">최신순</S.labelRadio>

              <S.inputRadio
                type="radio"
                id="responseAsc"
                value="responseAsc"
                checked={orderBy === "responseAsc"}
                onChange={() => setOrderBy("responseAsc")}
              />
              <S.labelRadio htmlFor="responseAsc">응답 높은순</S.labelRadio>

              <S.inputRadio
                type="radio"
                id="responseDesc"
                value="responseDesc"
                checked={orderBy === "responseDesc"}
                onChange={() => setOrderBy("responseDesc")}
              />
              <S.labelRadio htmlFor="responseDesc">응답 낮은순</S.labelRadio>
            </S.divSortList>
            <S.divCategoryWrapper>
              <CategoryDropdown state={category} setState={() => setCategory("전체")} />
            </S.divCategoryWrapper>
          </S.divSortWrapper>
          <S.divFormList>
            {data?.map(({ formId, title, category: formCategory, responseCount }) => (
              <S.divFormItem key={formId}>
                <S.h3ItemTitle>{title}</S.h3ItemTitle>
                <div>
                  <S.spanItemDate>카테고리: {formCategory}</S.spanItemDate>
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
