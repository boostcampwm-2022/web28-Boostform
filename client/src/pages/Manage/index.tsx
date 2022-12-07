/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import formApi from "api/formApi";
import ManageLayout from "components/template/BannerLayout";
import IconButton from "components/common/IconButton";
import ManageHead from "components/Manage/Head";
import ManageFormItem from "components/Manage/FormItem";
import EditNameModal from "components/Modal/EditFormNameModal";
import DeleteSurveyModal from "components/Modal/DeleteFormModal";
import useModal from "hooks/useModal";
import { FormItems, SelectedForm } from "types/manage";
import * as S from "./style";

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

  const onClickFetchForms = () => {
    setSize(fetchedForms.length);
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
    <ManageLayout backgroundColor="white" title="내 설문조사" description="내가 만든 설문조사 확인하기">
      <S.Container>
        <ManageHead />
        <S.FormListContainer>
          {fetchedForms.map((formItem, index) => (
            <ManageFormItem
              key={formItem._id}
              formItem={formItem}
              index={index}
              dropdowns={dropdowns}
              setDropdowns={setDropdowns}
              setModalType={setModalType}
              setSelectedForm={setSelectedForm}
              openModal={openModal}
            />
          ))}
          <S.ButtonContainer>
            <IconButton type="button" onClick={onClickFetchForms} icon="plus" size="24px" />
          </S.ButtonContainer>
        </S.FormListContainer>
      </S.Container>

      {modalType === "change" ? (
        <ModalPortal>
          <EditNameModal closeModal={closeModal} selectedForm={selectedForm} renderByNameChange={renderByNameChange} />
        </ModalPortal>
      ) : null}
      {modalType === "delete" ? (
        <ModalPortal>
          <DeleteSurveyModal
            closeModal={closeModal}
            selectedForm={selectedForm}
            renderByDeleteForm={renderByDeleteForm}
          />
        </ModalPortal>
      ) : null}
    </ManageLayout>
  );
}

export default Manage;
