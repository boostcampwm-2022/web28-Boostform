import React, { useState } from "react";
import Icon from "components/atoms/Icon";
import OutsideDetecter from "hooks/useOutsideDetecter";
import * as S from "./style";
import CategoryDropdownProps from "./type";

function CategoryDropdown({ state, setState }: CategoryDropdownProps) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<string>(state);
  const category = ["개발 및 학습", "취업 및 채용", "취미 및 여가", "기타"];

  return (
    <S.Container>
      <S.Button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setOpen((prev) => !prev);
        }}
      >
        <S.DropdownText>{selected}</S.DropdownText>
        <Icon type="dropdown" size="16px" />
      </S.Button>

      {open && (
        <OutsideDetecter callback={() => setOpen(false)}>
          <S.Content>
            {category.map((value) => (
              <li key={value}>
                <S.DropdownButton
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelected(value);
                    setOpen(false);
                    setState(value);
                  }}
                >
                  <S.DropdownText>{value}</S.DropdownText>
                </S.DropdownButton>
              </li>
            ))}
          </S.Content>
        </OutsideDetecter>
      )}
    </S.Container>
  );
}

export default CategoryDropdown;
