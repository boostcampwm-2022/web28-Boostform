import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import boardApi from "api/forumApi";
import Layout from "components/template/BannerLayout";
import Button from "components/common/Button";
import TextDropdown from "components/common/Dropdown/TextDropdown";
import Card from "components/common/Card";
import Pagination from "components/common/Pagination";
import Notice from "components/common/Notice";
import Skeleton from "components/common/Skeleton";
import useLoadingDelay from "hooks/useLoadingDelay";
import { CATEGORY_FORUM_LIST } from "store/form";
import theme from "styles/theme";
import { ForumCategory, OrderBy } from "types/forum";
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
  const [searchParams, setSearchParams] = useSearchParams();
  const initPage = Number(searchParams.get("page")) || 1;
  const initCategory = searchParams.get("category") || "";
  const initKeyword = searchParams.get("keyword") || "";
  const initOrderBy = searchParams.get("orderBy") || "";

  function isTypeOfCategory(categoryParam: string): categoryParam is ForumCategory {
    const Category = CATEGORY_FORUM_LIST as string[];
    return Category.includes(categoryParam);
  }
  function isTypeOfOrderBy(orderByParam: string): orderByParam is OrderBy {
    const ORDER_BY = ["latestAsc", "responseAsc", "responseDesc"];
    return ORDER_BY.includes(orderByParam);
  }

  const [inputSearch, setInputSearch] = useState(initKeyword);
  const [keyword, setKeyword] = useState(initKeyword);
  const [category, setCategory] = useState<ForumCategory>(isTypeOfCategory(initCategory) ? initCategory : "전체");
  const [orderBy, setOrderBy] = useState<OrderBy>(isTypeOfOrderBy(initOrderBy) ? initOrderBy : "latestAsc");
  const [page, setPage] = useState(Number(initPage));

  useEffect(() => {
    setInputSearch(initKeyword);
    setKeyword(initKeyword);
    setCategory(isTypeOfCategory(initCategory) ? initCategory : "전체");
    setOrderBy(isTypeOfOrderBy(initOrderBy) ? initOrderBy : "latestAsc");
    setPage(Number(initPage));
  }, [initCategory, initKeyword, initOrderBy, initPage]);

  const fetchFormList = (): Promise<ForumApi> => boardApi.getFormList({ title: keyword, category, orderBy, page });
  const { data, isLoading, isSuccess, isError } = useQuery({
    queryKey: [keyword, category, orderBy, page],
    queryFn: fetchFormList,
    retry: 2,
    useErrorBoundary: true,
  });

  const loadingDelay = useLoadingDelay(isLoading);

  const checkApiLoadingOrError = () => {
    if (isLoading || loadingDelay || isError) return true;
    return false;
  };

  const onSubmitSearchKeyword: React.FormEventHandler<HTMLElement> = (e) => {
    e.preventDefault();
    setSearchParams({ page: "1", category, keyword: inputSearch, orderBy });
  };

  return (
    <Layout backgroundColor="white" title="설문조사 게시판" description="다양한 설문조사를 만나보세요">
      <S.divContainer>
        <S.divSearchBox onSubmit={onSubmitSearchKeyword}>
          <S.inputSearch
            type="text"
            placeholder="검색어를 입력해주세요"
            onInput={(e) => setInputSearch(e.currentTarget.value)}
            value={inputSearch}
          />
          <Button
            type="submit"
            onSubmit={onSubmitSearchKeyword}
            fontSize={theme.fontSize.sz12}
            backgroundColor={theme.colors.blue3}
            color={theme.colors.white}
            style={{ marginLeft: "2px" }}
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
                setSearchParams({ page: "1", category, keyword, orderBy: "latestAsc" });
              }}
            />
            <S.labelRadio htmlFor="latestAsc">최신순</S.labelRadio>

            <S.inputRadio
              type="radio"
              id="responseAsc"
              value="responseAsc"
              checked={orderBy === "responseAsc"}
              onChange={() => {
                setSearchParams({ page: page.toString(), category, keyword, orderBy: "responseAsc" });
              }}
            />
            <S.labelRadio htmlFor="responseAsc">응답 높은순</S.labelRadio>

            <S.inputRadio
              type="radio"
              id="responseDesc"
              value="responseDesc"
              checked={orderBy === "responseDesc"}
              onChange={() => {
                setSearchParams({ page: "1", category, keyword, orderBy: "responseDesc" });
              }}
            />
            <S.labelRadio htmlFor="responseDesc">응답 낮은순</S.labelRadio>
          </S.divSortList>
          <S.divCategoryWrapper>
            <S.spanCategoryText>카테고리</S.spanCategoryText>
            <TextDropdown state={category} defaultState="카테고리를 선택해주세요" fontSize={theme.fontSize.sz12}>
              <TextDropdown.Head border="none" padding="0px" color={theme.colors.blue3} bold />
              <TextDropdown.ItemList style={{ top: "26px" }}>
                {CATEGORY_FORUM_LIST.map((value) => (
                  <TextDropdown.Item
                    key={value}
                    value={value}
                    onClick={() => {
                      setSearchParams({ page: "1", category: value, keyword, orderBy });
                    }}
                  />
                ))}
              </TextDropdown.ItemList>
            </TextDropdown>
          </S.divCategoryWrapper>
        </S.divSortWrapper>
        {!loadingDelay && data?.form.length ? (
          <>
            <Card>
              {data?.form.map(({ formId, title, category: formCategory, responseCount }) => (
                <Card.Item key={formId} title={title}>
                  <div>
                    <Card.ItemText>카테고리: {formCategory || "미정"}</Card.ItemText>
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
                      style={{ marginRight: "8px" }}
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
            <Pagination
              currentPage={page}
              lastPage={Number(data?.lastPage)}
              callback={(pageNumber: number) => {
                setSearchParams({ page: pageNumber.toString(), category, keyword, orderBy: "responseDesc" });
              }}
            />
          </>
        ) : null}

        {checkApiLoadingOrError()
          ? Array.from({ length: 3 }, (_, index) => index).map((value) => (
              <Skeleton key={value}>
                <Skeleton.Element type="title" />
                <Skeleton.Element type="text" />
                <Skeleton.Element type="text" />
                <Skeleton.Element type="text" />
                <Skeleton.Element type="text" />
                <Skeleton.Shimmer />
              </Skeleton>
            ))
          : null}
        {!loadingDelay && isSuccess && !data.form.length ? <Notice text="설문지가 존재하지 않습니다" /> : null}
      </S.divContainer>
    </Layout>
  );
}

export default Forum;
