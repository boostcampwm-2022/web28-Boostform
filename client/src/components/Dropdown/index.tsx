import React, { useState } from "react";
import Icon from "components/Icon/Icon.component";
import OutsideDetecter from "hooks/useOutsideDetecter";
import { Container, Button, Content, DropdownButton, DropdownText } from "./Dropdown.style";

type DropdownType = "checkbox" | "paragraph" | "multiple";

function Dropdown({ state, setState }: { state: DropdownType; setState: (value: DropdownType) => void }) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<DropdownType>(state);
  const types: DropdownType[] = ["checkbox", "multiple", "paragraph"];

  return (
    <Container>
      <Button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setOpen((prev) => !prev);
        }}
      >
        <Icon type={selected} size="16px" />
        <DropdownText>{selected}</DropdownText>
        <Icon type="dropdown" size="16px" />
      </Button>

      {open && (
        <OutsideDetecter callback={() => setOpen(false)}>
          <Content>
            {types.map((type) => (
              <li key={type}>
                <DropdownButton
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelected(type);
                    setOpen(false);
                    setState(type);
                  }}
                >
                  <Icon type={type} size="16px" />
                  <DropdownText>{type}</DropdownText>
                </DropdownButton>
              </li>
            ))}
          </Content>
        </OutsideDetecter>
      )}
    </Container>
  );
}

export default Dropdown;
