import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "components/template/BannerLayout";
import Button from "components/common/Button";
import theme from "styles/theme";
import boardApi from "api/forumApi";
import { useQuery } from "@tanstack/react-query";
import TextDropdown from "components/common/Dropdown/TextDropdown";
import { ForumCategory, OrderBy } from "types/forum";
import { CATEGORY_FORUM_LIST } from "store/form";
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
    <Layout backgroundColor="white" title="설문조사 게시판" description="다양한 설문조사를 만나보세요">
      <S.divContainer>
        <S.divSearchBox>
          <S.inputSearch
            type="text"
            placeholder="검색어를 입력해주세요"
            onInput={(e) => setKeyword(e.currentTarget.value)}
          />
          <Button
            type="button"
            onClick={() => refetch()}
            fontSize={theme.fontSize.sz12}
            backgroundColor={theme.colors.blue3}
            color={theme.colors.white}
            custom="margin-left: 2px;"
          >
            검색
          </Button>
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
            <S.spanCategoryText>카테고리</S.spanCategoryText>
            <TextDropdown state={category} defaultState="카테고리를 선택해주세요" fontSize={theme.fontSize.sz12}>
              <TextDropdown.Head border="none" padding="0px" color={theme.colors.blue3} bold />
              <TextDropdown.ItemList custom="top 26px;">
                {CATEGORY_FORUM_LIST.map((value) => (
                  <TextDropdown.Item key={value} value={value} onClick={() => setCategory("전체")} />
                ))}
              </TextDropdown.ItemList>
            </TextDropdown>
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
                <Button
                  type="button"
                  onClick={() => navigate(`/forms/${formId}/view`)}
                  backgroundColor={theme.colors.blue3}
                  color={theme.colors.white}
                  custom="margin-right: 8px;"
                >
                  설문조사 참여하기
                </Button>
                <Button
                  type="button"
                  onClick={() => navigate(`/forms/${formId}/result`)}
                  border={theme.colors.blue3}
                  backgroundColor={theme.colors.white}
                  color={theme.colors.blue3}
                >
                  설문조사 결과보기
                </Button>
              </S.divItemButtonWrapper>
            </S.divFormItem>
          ))}
        </S.divFormList>
      </S.divContainer>
    </Layout>
  );
}

export default Forum;
