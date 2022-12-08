/* eslint-disable no-underscore-dangle */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import formApi from "api/formApi";
import { useInfiniteQuery } from "@tanstack/react-query";
import ManageLayout from "components/template/BannerLayout";
import IconButton from "components/common/IconButton";
import EditNameModal from "components/Modal/EditFormNameModal";
import DeleteSurveyModal from "components/Modal/DeleteFormModal";
import useModal from "hooks/useModal";
import { FormList } from "types/manage";
import Card from "components/common/Card";
import Button from "components/common/Button";
import Icon from "components/common/Icon";
import theme from "styles/theme";
import * as S from "./style";

function Manage() {
  const [modalType, setModalType] = useState("delete");
  const [selectedFormId, setSelectedFormId] = useState("");

  const navigate = useNavigate();
  const { openModal, closeModal, ModalPortal } = useModal();

  const fetchFormLists = (cursor: string): Promise<FormList> => formApi.getFormLists(cursor);
  const { data, isLoading, isSuccess, fetchNextPage, hasNextPage, refetch } = useInfiniteQuery({
    queryKey: ["a"],
    queryFn: ({ pageParam = "empty" }) => fetchFormLists(pageParam),
    getNextPageParam: (lastItem) => lastItem.lastId,
  });

  const refetchData = () => refetch();

  const onClickCreateForm = async () => {
    const { formId } = await formApi.createForm();
    navigate(`/forms/${formId}/edit`);
  };

  const onClickNavigateEditForm = (formId: string) => {
    navigate(`/forms/${formId}/edit`);
  };

  const onClickNavigateFormResult = (formId: string) => {
    navigate(`/forms/${formId}/result`);
  };

  const onClickOpenNameChangeModal = (id: string) => {
    setModalType("change");
    setSelectedFormId(id);
    openModal();
  };

  const onClickOpenDeleteFormModal = (id: string) => {
    setModalType("delete");
    setSelectedFormId(id);
    openModal();
  };

  return (
    <ManageLayout backgroundColor="white" title="내 설문조사" description="내가 만든 설문조사 확인하기">
      <S.Container>
        <S.HeaderContainer>
          <Button
            type="button"
            onClick={onClickCreateForm}
            backgroundColor={theme.colors.blue3}
            color={theme.colors.white}
            fontSize={theme.fontSize.sz16}
          >
            <Icon type="plus" size="24px" fill="white" />
            <S.NewFormText>새 설문지</S.NewFormText>
          </Button>
        </S.HeaderContainer>

        <S.FormListContainer>
          <Card>
            {isSuccess
              ? data?.pages.map((page) =>
                  page.form.map(({ category, _id, onBoard, response, title, updatedAt, acceptResponse }, index) => (
                    <Card.Item title={title} key={_id}>
                      <S.GridBox>
                        <div>
                          <Card.ItemText>카테고리: {category || "미정"}</Card.ItemText>
                        </div>
                        <div>
                          <Card.ItemText>응답수: {response}</Card.ItemText>
                        </div>
                        <div>
                          <Card.ItemText>수정일: {updatedAt}</Card.ItemText>
                        </div>
                        <div>
                          <Card.ItemText>게시판 공유: </Card.ItemText>
                          <S.Flicker>{onBoard ? "💡" : "🔒"}</S.Flicker>
                        </div>
                        <div>
                          <Card.ItemText>응답받기: </Card.ItemText>
                          <S.Flicker>{acceptResponse ? "💡" : "🔒"}</S.Flicker>
                        </div>
                      </S.GridBox>
                      <Card.ButtonWrapper>
                        <Button
                          type="button"
                          onClick={() => onClickNavigateEditForm(_id)}
                          backgroundColor={theme.colors.blue3}
                          color={theme.colors.white}
                          custom="margin-right: 8px;"
                        >
                          설문조사 수정하기
                        </Button>
                        <Button
                          type="button"
                          onClick={() => onClickNavigateFormResult(_id)}
                          border={theme.colors.blue3}
                          backgroundColor={theme.colors.white}
                          color={theme.colors.blue3}
                          custom="margin-right: 8px;"
                        >
                          설문조사 결과보기
                        </Button>
                        <Button
                          type="button"
                          onClick={() => onClickOpenNameChangeModal(_id)}
                          backgroundColor={theme.colors.blue3}
                          color={theme.colors.white}
                          custom="margin-right: 8px;"
                        >
                          제목 수정하기
                        </Button>
                        <Button
                          type="button"
                          onClick={() => onClickOpenDeleteFormModal(_id)}
                          border={theme.colors.red1}
                          backgroundColor={theme.colors.white}
                          color={theme.colors.red1}
                        >
                          삭제하기
                        </Button>
                      </Card.ButtonWrapper>
                    </Card.Item>
                  ))
                )
              : null}
          </Card>
          <S.ButtonContainer>
            <IconButton type="button" onClick={() => fetchNextPage()} icon="plus" size="24px" />
          </S.ButtonContainer>
          {isLoading ? <div>로딩중</div> : null}
          {!hasNextPage && !isLoading ? <div>끝</div> : null}
        </S.FormListContainer>
      </S.Container>

      {modalType === "change" ? (
        <ModalPortal>
          <EditNameModal closeModal={closeModal} selectedFormId={selectedFormId} refetchData={refetchData} />
        </ModalPortal>
      ) : null}
      {modalType === "delete" ? (
        <ModalPortal>
          <DeleteSurveyModal closeModal={closeModal} selectedFormId={selectedFormId} refetchData={refetchData} />
        </ModalPortal>
      ) : null}
    </ManageLayout>
  );
}

export default Manage;
