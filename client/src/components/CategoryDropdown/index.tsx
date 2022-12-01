import React, { useState } from "react";
import Icon from "components/Icon";
import OutsideDetecter from "hooks/useOutsideDetecter";
import { Container, Button, Content, DropdownButton, DropdownText } from "./style";
import CategoryDropdownProps from "./type";

function CategoryDropdown({ state, setState }: CategoryDropdownProps) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<string>(state);
  const category = ["개발 및 학습", "취업 및 채용", "취미 및 여가", "기타"];

  return (
    <Container>
      <Button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setOpen((prev) => !prev);
        }}
      >
        <DropdownText>{selected}</DropdownText>
        <Icon type="dropdown" size="16px" />
      </Button>

      {open && (
        <OutsideDetecter callback={() => setOpen(false)}>
          <Content>
            {category.map((value) => (
              <li key={value}>
                <DropdownButton
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelected(value);
                    setOpen(false);
                    setState(value);
                  }}
                >
                  <DropdownText>{value}</DropdownText>
                </DropdownButton>
              </li>
            ))}
          </Content>
        </OutsideDetecter>
      )}
    </Container>
  );
}

export default CategoryDropdown;
