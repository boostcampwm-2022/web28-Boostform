import React from "react";
import { ReactComponent as Plus } from "assets/Icon/plus.svg";
import { ReactComponent as Kebab } from "assets/Icon/kebab.svg";
import { ReactComponent as TrashCan } from "assets/Icon/trashcan.svg";
import { ReactComponent as Text } from "assets/Icon/text.svg";
import Container from "./Icon.style";
import IconProps from "./Icon.type";

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
