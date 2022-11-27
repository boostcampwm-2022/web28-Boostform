import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import formApi from "api/formApi";
import Head from "components/Header";
import Icon from "components/Icon";
import FormLayout from "components/Layout";
import useModal from "hooks/useModal/useModal";
import OutsideDetecter from "hooks/useOutsideDetecter/useOutsideDetecter";
import EditNameModal from "../../components/Modal/EditFormNameModal";
import DeleteSurveyModal from "../../components/Modal/DeleteFormModal";
import {
  Container,
  HeaderContainer,
  Header,
  FormListContainer,
  FormList,
  Title,
  Status,
  ResponseCount,
  Date,
  Share,
  Category,
  More,
  ButtonContainer,
  Button,
  NewFormButton,
  NewFormText,
  Dropdown,
  DropdownButton,
  DropdownText,
} from "./Manage.style";
import { FormItems, SelectedForm } from "./Manage.type";

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

  const onClickCreateForm: React.MouseEventHandler<HTMLButtonElement> = async () => {
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
        <Container>
          <HeaderContainer>
            <NewFormButton type="button" onClick={onClickCreateForm}>
              <Icon type="plus" size="24px" />
              <NewFormText>새 설문지</NewFormText>
            </NewFormButton>
            <Header>
              <Title>제목</Title>
              <Status>상태</Status>
              <ResponseCount>응답수</ResponseCount>
              <Date>수정 날짜</Date>
              <Share>게시판 공유</Share>
              <Category>카테고리</Category>
              <More>더보기</More>
            </Header>
          </HeaderContainer>
          <FormListContainer>
            <>
              {fetchedForms.map(({ category, _id, onBoard, response, title, updatedAt, acceptResponse }, index) => (
                <FormList key={_id} onClick={() => onClickNavigateForm(_id)}>
                  <Title key={`${_id}Title`}>{title}</Title>
                  <Status key={`${_id}AcceptResponse`}>{acceptResponse ? "Open" : "Close"}</Status>
                  <ResponseCount key={`${_id}Response`}>{response}</ResponseCount>
                  <Date key={`${_id}UpdatedAt`}>{updatedAt}</Date>
                  <Share key={`${_id}onBoard`}>{onBoard ? "On" : "Off"}</Share>
                  <Category key={`${_id}Category`}>{category}</Category>
                  <More key={`${_id}More`}>
                    <span>
                      <Button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onClickOpenDropdown(index);
                        }}
                      >
                        <Icon type="kebab" size="16px" />
                      </Button>
                      {dropdowns[index] && (
                        <OutsideDetecter callback={closeAllDropDown}>
                          <Dropdown>
                            <li key={`${_id}EditName`}>
                              <DropdownButton
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  onClickOpenNameChangeModal(_id, index);
                                }}
                              >
                                <Icon type="text" size="16px" />
                                <DropdownText>제목 바꾸기</DropdownText>
                              </DropdownButton>
                            </li>
                            <li key={`${_id}DeleteSurvey`}>
                              <DropdownButton
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  onClickOpenDeleteFormModal(_id, index);
                                }}
                              >
                                <Icon type="trashcan" size="16px" />
                                <DropdownText>삭제</DropdownText>
                              </DropdownButton>
                            </li>
                          </Dropdown>
                        </OutsideDetecter>
                      )}
                    </span>
                  </More>
                </FormList>
              ))}
            </>
            <ButtonContainer>
              <Button type="button" onClick={onClickFetchForms}>
                <Icon type="plus" size="24px" />
              </Button>
            </ButtonContainer>
          </FormListContainer>

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
        </Container>
      </FormLayout>
    </>
  );
}

export default Manage;
