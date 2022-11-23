import React, { useState } from "react";
import Icon from "components/Icon/Icon.component";
import OutsideDetecter from "hooks/useOutsideDetecter";
import { Container, Button, Content, DropdownButton, DropdownText } from "./TitleDropdown.style";

function TitleDropdown({ state, setState }: { state: string; setState: (value: string) => void }) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<string>(state);
  const category = ["MBTI", "Quiz", "survey"];

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

export default TitleDropdown;
