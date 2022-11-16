import React from "react";
import styled from "styled-components";
import { ReactComponent as Plus } from "assets/Icon/plus.svg";
import { ReactComponent as Kebab } from "assets/Icon/kebab.svg";
import { ReactComponent as TrashCan } from "assets/Icon/trashcan.svg";
import { ReactComponent as Text } from "assets/Icon/text.svg";

interface IconProps {
  type: "plus" | "kebab" | "trashcan" | "text";
  size: string;
}

const Container = styled.span`
  display: inline-block;
`;

function Icon({ type, size }: IconProps) {
  return (
    <Container>
      {type === "plus" && <Plus height={size} width={size} />}
      {type === "kebab" && <Kebab height={size} width={size} />}
      {type === "trashcan" && <TrashCan height={size} width={size} />}
      {type === "text" && <Text height={size} width={size} />}
    </Container>
  );
}

export default Icon;
