import React, { useContext, useMemo, useState } from "react";
import Icon from "components/common/Icon";
import OutsideDetecter from "hooks/useOutsideDetecter";
import theme from "styles/theme";
import TextDropdownContext from "contexts/textDropdownContext";
import { DropdownProps, HeadProps, ItemProps, ItemListProps } from "./type";
import * as S from "./style";

function Dropdown({ children, state, defaultState, fontSize = "" }: DropdownProps) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<string>(state || defaultState);

  const DropdownContextValue = useMemo(
    () => ({ open, setOpen, selected, setSelected, fontSize }),
    [open, selected, fontSize]
  );

  return (
    <TextDropdownContext.Provider value={DropdownContextValue}>
      <S.Container>{children}</S.Container>
    </TextDropdownContext.Provider>
  );
}

Dropdown.defaultProps = {
  fontSize: "",
};

function Head({ border = theme.colors.grey3, padding = "10px", color = theme.colors.black, bold = false }: HeadProps) {
  const { setOpen, selected, fontSize } = useContext(TextDropdownContext);

  return (
    <S.Button
      border={border}
      padding={padding}
      type="button"
      fontSize={fontSize}
      color={color}
      bold={bold}
      onClick={(e) => {
        e.stopPropagation();
        if (setOpen) setOpen((prev) => !prev);
      }}
    >
      <S.DropdownText>{selected}</S.DropdownText>
      <Icon type="dropdown" size="16px" />
    </S.Button>
  );
}

Head.defaultProps = {
  border: theme.colors.grey3,
  padding: "10px",
  color: theme.colors.black,
  bold: false,
};

function ItemList({ children, style }: ItemListProps) {
  const { open, setOpen } = useContext(TextDropdownContext);

  return open ? (
    <OutsideDetecter callback={() => setOpen && setOpen(false)}>
      <S.Content style={style}>{children}</S.Content>
    </OutsideDetecter>
  ) : null;
}

function Item({ value, onClick }: ItemProps) {
  const { setSelected, setOpen, fontSize } = useContext(TextDropdownContext);

  return (
    <li>
      <S.DropdownButton
        type="button"
        fontSize={fontSize}
        onClick={(e) => {
          e.stopPropagation();
          if (setSelected) setSelected(value);
          if (setOpen) setOpen(false);
          onClick();
        }}
      >
        <S.DropdownText>{value}</S.DropdownText>
      </S.DropdownButton>
    </li>
  );
}

const TextDropdown = Object.assign(Dropdown, { Head, Item, ItemList });

export default TextDropdown;
