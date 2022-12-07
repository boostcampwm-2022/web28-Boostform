import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "components/template/BannerLayout";
import Button from "components/common/Button";
import theme from "styles/theme";
import boardApi from "api/forumApi";
import { useQuery } from "@tanstack/react-query";
import TextDropdown from "components/common/Dropdown/TextDropdown";
import Card from "components/common/Card";
import Pagination from "components/common/Pagination";
import { ForumCategory, OrderBy } from "types/forum";
import { CATEGORY_FORUM_LIST } from "store/form";
import * as S from "./style";

interface FormList {
  formId: string;
  title: string;
  category: string;
  responseCount: number;
}

interface ForumApi {
  form: FormList[];
  lastPage: number;
}

function Forum() {
  const navigate = useNavigate();

  const [inputSearch, setInputSearch] = useState("");
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState<ForumCategory>("전체");
  const [orderBy, setOrderBy] = useState<OrderBy>("latestAsc");
  const [page, setPage] = useState(1);

  const fetchFormList = (): Promise<ForumApi> => boardApi.getFormList({ title: keyword, category, orderBy, page });
  const { data } = useQuery({
    queryKey: [keyword, category, orderBy, page],
    queryFn: fetchFormList,
  });

  return (
    <Layout backgroundColor="white" title="설문조사 게시판" description="다양한 설문조사를 만나보세요">
      <S.divContainer>
        <S.divSearchBox>
          <S.inputSearch
            type="text"
            placeholder="검색어를 입력해주세요"
            onInput={(e) => setInputSearch(e.currentTarget.value)}
            value={inputSearch}
          />
          <Button
            type="button"
            onClick={() => {
              setKeyword(inputSearch);
              setPage(1);
            }}
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
              onChange={() => {
                setOrderBy("latestAsc");
                setPage(1);
              }}
            />
            <S.labelRadio htmlFor="latestAsc">최신순</S.labelRadio>

            <S.inputRadio
              type="radio"
              id="responseAsc"
              value="responseAsc"
              checked={orderBy === "responseAsc"}
              onChange={() => {
                setOrderBy("responseAsc");
                setPage(1);
              }}
            />
            <S.labelRadio htmlFor="responseAsc">응답 높은순</S.labelRadio>

            <S.inputRadio
              type="radio"
              id="responseDesc"
              value="responseDesc"
              checked={orderBy === "responseDesc"}
              onChange={() => {
                setOrderBy("responseDesc");
                setPage(1);
              }}
            />
            <S.labelRadio htmlFor="responseDesc">응답 낮은순</S.labelRadio>
          </S.divSortList>
          <S.divCategoryWrapper>
            <S.spanCategoryText>카테고리</S.spanCategoryText>
            <TextDropdown state={category} defaultState="카테고리를 선택해주세요" fontSize={theme.fontSize.sz12}>
              <TextDropdown.Head border="none" padding="0px" color={theme.colors.blue3} bold />
              <TextDropdown.ItemList custom="top 26px;">
                {CATEGORY_FORUM_LIST.map((value) => (
                  <TextDropdown.Item
                    key={value}
                    value={value}
                    onClick={() => {
                      setCategory(value);
                      setPage(1);
                    }}
                  />
                ))}
              </TextDropdown.ItemList>
            </TextDropdown>
          </S.divCategoryWrapper>
        </S.divSortWrapper>
        {data?.form.length ? (
          <>
            <Card>
              {data?.form.map(({ formId, title, category: formCategory, responseCount }) => (
                <Card.Item key={formId} title={title}>
                  <div>
                    <Card.ItemText>카테고리: {formCategory}</Card.ItemText>
                  </div>
                  <div>
                    <Card.ItemText>응답 수: {responseCount}</Card.ItemText>
                  </div>
                  <Card.ButtonWrapper>
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
                  </Card.ButtonWrapper>
                </Card.Item>
              ))}
            </Card>
            <Pagination currentPage={page} lastPage={Number(data?.lastPage)} setPage={setPage} />
          </>
        ) : null}
      </S.divContainer>
    </Layout>
  );
}

export default Forum;
