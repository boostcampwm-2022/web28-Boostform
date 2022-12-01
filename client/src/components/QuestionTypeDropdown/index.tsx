import React, { useState } from "react";
import Icon from "components/Icon";
import OutsideDetecter from "hooks/useOutsideDetecter";
import { QuestionType } from "types/form";
import * as S from "./style";
import QuestionTypeDropdownProps from "./type";

function QuestionTypeDropdown({ state, setState }: QuestionTypeDropdownProps) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<QuestionType>(state);
  const types: QuestionType[] = ["checkbox", "multiple", "paragraph"];

  return (
    <S.Container>
      <S.Button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setOpen((prev) => !prev);
        }}
      >
        <Icon type={selected} size="16px" />
        <S.DropdownText>{selected}</S.DropdownText>
        <Icon type="dropdown" size="16px" />
      </S.Button>

      {open && (
        <OutsideDetecter callback={() => setOpen(false)}>
          <S.Content>
            {types.map((type) => (
              <li key={type}>
                <S.DropdownButton
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelected(type);
                    setOpen(false);
                    setState(type);
                  }}
                >
                  <Icon type={type} size="16px" />
                  <S.DropdownText>{type}</S.DropdownText>
                </S.DropdownButton>
              </li>
            ))}
          </S.Content>
        </OutsideDetecter>
      )}
    </S.Container>
  );
}

export default QuestionTypeDropdown;
