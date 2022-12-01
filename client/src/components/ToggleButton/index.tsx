import React, { useState } from "react";
import * as S from "./style";
import ToggleButtonProps from "./type";

function ToggleButton({ state, onClick }: ToggleButtonProps) {
  const [toggle, setToggle] = useState(state);

  const onClickToggle = () => {
    setToggle((prev) => !prev);
  };

  return (
    <S.Container>
      <S.Toggle toggle={toggle}>
        <S.Button onClick={onClickToggle} toggle={toggle} onTransitionEnd={() => onClick()} />
      </S.Toggle>
    </S.Container>
  );
}

export default ToggleButton;
