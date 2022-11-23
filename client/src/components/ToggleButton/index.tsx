import React, { useState } from "react";
import { Container, Button, Toggle } from "./ToggleButton.style";

function ToggleButton({ state, onClick }: { state: boolean; onClick: () => void }) {
  const [toggle, setToggle] = useState(state);

  const onClickToggle = () => {
    setToggle((prev) => !prev);
    onClick();
  };

  return (
    <Container>
      <Toggle toggle={toggle}>
        <Button onClick={onClickToggle} toggle={toggle} />
      </Toggle>
    </Container>
  );
}

export default ToggleButton;
