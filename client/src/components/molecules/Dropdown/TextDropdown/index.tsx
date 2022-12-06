import React, { useState } from "react";
import Icon from "components/atoms/Icon";
import OutsideDetecter from "hooks/useOutsideDetecter";
import * as S from "../style";
import TextDropdownProps from "./type";

function Dropdown({ state, setState, items, defaultState }: TextDropdownProps) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<string>(state || defaultState);

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
            {items.map((value) => (
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

export default Dropdown;
