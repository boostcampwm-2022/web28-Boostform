import React from "react";
import { ReactComponent as Plus } from "assets/Icon/plus.svg";
import { ReactComponent as Kebab } from "assets/Icon/kebab.svg";
import { ReactComponent as TrashCan } from "assets/Icon/trashcan.svg";
import { ReactComponent as Text } from "assets/Icon/text.svg";
import { ReactComponent as Github } from "assets/Icon/github.svg";
import { ReactComponent as Paragraph } from "assets/Icon/paragraph.svg";
import { ReactComponent as Multiple } from "assets/Icon/multiple.svg";
import { ReactComponent as Checkbox } from "assets/Icon/checkbox.svg";
import { ReactComponent as CheckboxEmpty } from "assets/Icon/checkboxEmpty.svg";
import { ReactComponent as CheckboxFull } from "assets/Icon/checkboxFull.svg";
import { ReactComponent as Dropdown } from "assets/Icon/dropdown.svg";
import { ReactComponent as Close } from "assets/Icon/close.svg";
import { ReactComponent as Copy } from "assets/Icon/copy.svg";
import Container from "./Icon.style";
import IconProps from "./Icon.type";

function Icon({ type, size, fill }: IconProps) {
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
      {type === "checkboxEmpty" && <CheckboxEmpty height={size} width={size} fill={fill} />}
      {type === "checkboxFull" && <CheckboxFull height={size} width={size} />}
      {type === "dropdown" && <Dropdown height={size} width={size} />}
      {type === "close" && <Close height={size} width={size} />}
      {type === "copy" && <Copy height={size} width={size} />}
    </Container>
  );
}

export default Icon;
