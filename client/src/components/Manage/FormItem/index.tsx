import React from "react";
import { useNavigate } from "react-router-dom";
import ManageDropdown from "components/Manage/Dropdown";
import ManageFormItemProps from "./type";
import * as S from "./style";

function ManageFormItem({
  formItem,
  index,
  dropdowns,
  setDropdowns,
  setModalType,
  setSelectedForm,
  openModal,
}: ManageFormItemProps) {
  const navigate = useNavigate();
  const { category, _id, onBoard, response, title, updatedAt, acceptResponse } = formItem;

  const onClickNavigateForm = (formId: string) => {
    navigate(`/forms/${formId}/edit`);
  };

  return (
    <S.FormList key={_id} onClick={() => onClickNavigateForm(_id)}>
      <S.Title key={`${_id}Title`}>{title}</S.Title>
      <S.Status key={`${_id}AcceptResponse`}>{acceptResponse ? "Open" : "Close"}</S.Status>
      <S.ResponseCount key={`${_id}Response`}>{response}</S.ResponseCount>
      <S.Date key={`${_id}UpdatedAt`}>{updatedAt}</S.Date>
      <S.Share key={`${_id}onBoard`}>{onBoard ? "On" : "Off"}</S.Share>
      <S.Category key={`${_id}Category`}>{category}</S.Category>
      <S.More key={`${_id}More`}>
        <ManageDropdown
          formItem={formItem}
          index={index}
          dropdowns={dropdowns}
          setDropdowns={setDropdowns}
          setModalType={setModalType}
          setSelectedForm={setSelectedForm}
          openModal={openModal}
        />
      </S.More>
    </S.FormList>
  );
}

export default ManageFormItem;
