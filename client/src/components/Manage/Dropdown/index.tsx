import React from "react";
import Icon from "components/common/Icon";
import OutsideDetecter from "hooks/useOutsideDetecter";
import ManageDropdownProps from "./type";
import * as S from "./style";

function ManageDropdown({
  formItem,
  index,
  dropdowns,
  setDropdowns,
  setModalType,
  setSelectedForm,
  openModal,
}: ManageDropdownProps) {
  const { _id } = formItem;

  const onClickOpenDropdown = (idx: number) => {
    setDropdowns((prev) => {
      const value = prev[idx];
      const { length } = prev;

      const curr = Array(length).fill(false);
      curr[idx] = !value;
      return curr;
    });
  };

  const closeAllDropDown = () => {
    const { length } = dropdowns;
    setDropdowns(Array(length).fill(false));
  };

  const onClickOpenNameChangeModal = () => {
    closeAllDropDown();
    setModalType("change");
    setSelectedForm({ id: _id, index });
    openModal();
  };

  const onClickOpenDeleteFormModal = () => {
    closeAllDropDown();
    setModalType("delete");
    setSelectedForm({ id: _id, index });
    openModal();
  };

  return (
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
                  onClickOpenNameChangeModal();
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
                  onClickOpenDeleteFormModal();
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
  );
}

export default ManageDropdown;
