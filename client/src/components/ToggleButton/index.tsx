import React, { useState } from "react";
import { Container, Button, Toggle } from "./ToggleButton.style";
import ToggleButtonProps from "./ToggleButton.type";

function ToggleButton({ state, onClick }: ToggleButtonProps) {
  const [toggle, setToggle] = useState(state);

  const onClickToggle = () => {
    setToggle((prev) => !prev);
  };

  return (
    <Container>
      <Toggle toggle={toggle}>
        <Button onClick={onClickToggle} toggle={toggle} onTransitionEnd={() => onClick()} />
      </Toggle>
    </Container>
  );
}

export default ToggleButton;
