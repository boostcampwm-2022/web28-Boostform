import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import formApi from "api/formApi";
import Head from "components/Header";
import Icon from "components/Icon";
import FormLayout from "components/Layout";
import Button from "components/atoms/Button";
import theme from "styles/theme";
import useModal from "hooks/useModal";
import OutsideDetecter from "hooks/useOutsideDetecter";
import EditNameModal from "../../components/Modal/EditFormNameModal";
import DeleteSurveyModal from "../../components/Modal/DeleteFormModal";
import * as S from "./style";
import { FormItems, SelectedForm } from "./type";

function Manage() {
  const [size, setSize] = useState(0);
  const [fetchedForms, setFetchedForms] = useState<FormItems[]>([]);
  const [dropdowns, setDropdowns] = useState<boolean[]>([]);
  const [modalType, setModalType] = useState("delete");
  const [selectedForm, setSelectedForm] = useState<SelectedForm>({ id: "", index: 0 });

  const navigate = useNavigate();
  const { openModal, closeModal, ModalPortal } = useModal();
  useEffect(() => {
    formApi
      .getFormLists(size)
      .then((response) => {
        setFetchedForms((prev) => [...prev, ...response.data.form]);

        const falseArray = new Array(response.data.form.length).fill(false);
        setDropdowns((prev) => [...prev, ...falseArray]);
      })
      .catch((e) => {
        if (e.response?.status === 401) navigate(`/login`);
      });
  }, [size, navigate]);

  const onClickCreateForm = async () => {
    const { formId } = await formApi.createForm();
    navigate(`/forms/${formId}/edit`);
  };

  const onClickNavigateForm = (formId: string) => {
    navigate(`/forms/${formId}/edit`);
  };

  const onClickFetchForms: React.MouseEventHandler<HTMLButtonElement> = () => {
    setSize(fetchedForms.length);
  };

  const onClickOpenDropdown = (index: number) => {
    setDropdowns((prev) => {
      const value = prev[index];
      const { length } = prev;

      const curr = Array(length).fill(false);

      curr[index] = !value;
      return curr;
    });
  };

  const closeAllDropDown = () => {
    const { length } = dropdowns;
    setDropdowns(Array(length).fill(false));
  };

  const onClickOpenNameChangeModal = (formId: string, index: number) => {
    closeAllDropDown();
    setModalType("change");
    setSelectedForm({ id: formId, index });
    openModal();
  };

  const onClickOpenDeleteFormModal = (formId: string, index: number) => {
    closeAllDropDown();
    setModalType("delete");
    setSelectedForm({ id: formId, index });
    openModal();
  };

  const renderByDeleteForm = (index: number) => {
    setFetchedForms((prev) => {
      const left = prev.slice(0, index);
      const right = prev.slice(index + 1);
      return [...left, ...right];
    });
    setDropdowns((prev) => {
      const left = prev.slice(0, index);
      const right = prev.slice(index + 1);
      return [...left, ...right];
    });
  };

  const renderByNameChange = (index: number, title: string) => {
    setFetchedForms((prev) => {
      const targetSurvey = prev[index];
      targetSurvey.title = title;

      return [...prev];
    });
  };

  return (
    <>
      <Head />
      <FormLayout backgroundColor="white">
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
            <S.Header>
              <S.Title>제목</S.Title>
              <S.Status>상태</S.Status>
              <S.ResponseCount>응답수</S.ResponseCount>
              <S.Date>수정 날짜</S.Date>
              <S.Share>게시판 공유</S.Share>
              <S.Category>카테고리</S.Category>
              <S.More>더보기</S.More>
            </S.Header>
          </S.HeaderContainer>
          <S.FormListContainer>
            <>
              {fetchedForms.map(({ category, _id, onBoard, response, title, updatedAt, acceptResponse }, index) => (
                <S.FormList key={_id} onClick={() => onClickNavigateForm(_id)}>
                  <S.Title key={`${_id}Title`}>{title}</S.Title>
                  <S.Status key={`${_id}AcceptResponse`}>{acceptResponse ? "Open" : "Close"}</S.Status>
                  <S.ResponseCount key={`${_id}Response`}>{response}</S.ResponseCount>
                  <S.Date key={`${_id}UpdatedAt`}>{updatedAt}</S.Date>
                  <S.Share key={`${_id}onBoard`}>{onBoard ? "On" : "Off"}</S.Share>
                  <S.Category key={`${_id}Category`}>{category}</S.Category>
                  <S.More key={`${_id}More`}>
                    <span>
                      <S.Button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onClickOpenDropdown(index);
                        }}
                      >
                        <Icon type="kebab" size="16px" />
                      </S.Button>
                      {dropdowns[index] && (
                        <OutsideDetecter callback={closeAllDropDown}>
                          <S.Dropdown>
                            <li key={`${_id}EditName`}>
                              <S.DropdownButton
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  onClickOpenNameChangeModal(_id, index);
                                }}
                              >
                                <Icon type="text" size="16px" />
                                <S.DropdownText>제목 바꾸기</S.DropdownText>
                              </S.DropdownButton>
                            </li>
                            <li key={`${_id}DeleteSurvey`}>
                              <S.DropdownButton
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  onClickOpenDeleteFormModal(_id, index);
                                }}
                              >
                                <Icon type="trashcan" size="16px" />
                                <S.DropdownText>삭제</S.DropdownText>
                              </S.DropdownButton>
                            </li>
                          </S.Dropdown>
                        </OutsideDetecter>
                      )}
                    </span>
                  </S.More>
                </S.FormList>
              ))}
            </>
            <S.ButtonContainer>
              <S.Button type="button" onClick={onClickFetchForms}>
                <Icon type="plus" size="24px" />
              </S.Button>
            </S.ButtonContainer>
          </S.FormListContainer>

          {modalType === "change" && (
            <ModalPortal>
              <EditNameModal
                closeModal={closeModal}
                selectedForm={selectedForm}
                renderByNameChange={renderByNameChange}
              />
            </ModalPortal>
          )}
          {modalType === "delete" && (
            <ModalPortal>
              <DeleteSurveyModal
                closeModal={closeModal}
                selectedForm={selectedForm}
                renderByDeleteForm={renderByDeleteForm}
              />
            </ModalPortal>
          )}
        </S.Container>
      </FormLayout>
    </>
  );
}

export default Manage;
