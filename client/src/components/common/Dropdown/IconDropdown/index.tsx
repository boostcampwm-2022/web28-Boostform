import React, { useState } from "react";
import Icon from "components/common/Icon";
import OutsideDetecter from "hooks/useOutsideDetecter";
import * as S from "./style";
import { IconDropdownProps } from "./type";

function IconDropdown({ state, setState, items, defaultValue }: IconDropdownProps) {
  const findIcon = (str: string) => {
    const target = items.find(({ value }) => value === str);
    if (target) return target.icon;
    return null;
  };

  const findText = (str: string) => {
    const target = items.find(({ value }) => value === str);
    if (target) return target.text;
    return null;
  };

  const [open, setOpen] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState(findIcon(state));
  const [selectedText, setSelectedText] = useState<string | null>(findText(state) || defaultValue);

  return (
    <S.Container>
      <S.Button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setOpen((prev) => !prev);
        }}
      >
        {selectedIcon ? <Icon type={selectedIcon} size="16px" /> : null}
        <S.DropdownText>{selectedText}</S.DropdownText>
        <Icon type="dropdown" size="16px" />
      </S.Button>

      {open && (
        <OutsideDetecter callback={() => setOpen(false)}>
          <S.Content>
            {items.map(({ value, icon, text }) => (
              <li key={value}>
                <S.DropdownButton
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedIcon(findIcon(value));
                    setSelectedText(findText(value));
                    setOpen(false);
                    setState(value);
                  }}
                >
                  <Icon type={icon} size="16px" />
                  <S.DropdownText>{text}</S.DropdownText>
                </S.DropdownButton>
              </li>
            ))}
          </S.Content>
        </OutsideDetecter>
      )}
    </S.Container>
  );
}

export default IconDropdown;
