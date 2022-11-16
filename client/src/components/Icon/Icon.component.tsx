import React from "react";
import styled from "styled-components";
import { ReactComponent as Plus } from "assets/Icon/plus.svg";
import { ReactComponent as Kebab } from "assets/Icon/kebab.svg";

interface ButtonProps {
  size: string;
}

interface IconProps {
  type: "plus" | "kebab";
  size: string;
}

const Container = styled.div<ButtonProps>`
  width: ${(props) => props.size};
  height: ${(props) => props.size};
`;

function Icon({ type, size }: IconProps) {
  return (
    <Container size={size}>
      {type === "plus" && <Plus />}
      {type === "kebab" && <Kebab />}
    </Container>
  );
}

export default Icon;
