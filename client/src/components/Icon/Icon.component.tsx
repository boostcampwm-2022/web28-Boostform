import React from "react";
import { ReactComponent as Plus } from "assets/Icon/plus.svg";
import { ReactComponent as Kebab } from "assets/Icon/kebab.svg";
import { ReactComponent as TrashCan } from "assets/Icon/trashcan.svg";
import { ReactComponent as Text } from "assets/Icon/text.svg";
import { ReactComponent as Github } from "assets/Icon/github.svg";
import { ReactComponent as Paragraph } from "assets/Icon/paragraph.svg";
import { ReactComponent as Multiple } from "assets/Icon/multiple.svg";
import { ReactComponent as Checkbox } from "assets/Icon/checkbox.svg";
import Container from "./Icon.style";
import IconProps from "./Icon.type";

function Icon({ type, size }: IconProps) {
  return (
    <Container>
      {type === "plus" && <Plus height={size} width={size} />}
      {type === "kebab" && <Kebab height={size} width={size} />}
      {type === "trashcan" && <TrashCan height={size} width={size} />}
      {type === "text" && <Text height={size} width={size} />}
      {type === "github" && <Github height={size} width={size} />}
      {type === "paragraph" && <Paragraph height={size} width={size} />}
      {type === "multiple" && <Multiple height={size} width={size} />}
      {type === "checkbox" && <Checkbox height={size} width={size} />}
    </Container>
  );
}

export default Icon;
