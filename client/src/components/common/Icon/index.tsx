import React from "react";
import { ReactComponent as Plus } from "assets/Icon/plus.svg";
import { ReactComponent as Kebab } from "assets/Icon/kebab.svg";
import { ReactComponent as TrashCan } from "assets/Icon/trashcan.svg";
import { ReactComponent as Text } from "assets/Icon/text.svg";
import { ReactComponent as Github } from "assets/Icon/github.svg";
import { ReactComponent as Paragraph } from "assets/Icon/paragraph.svg";
import { ReactComponent as Multiple } from "assets/Icon/multiple.svg";
import { ReactComponent as MultipleEmpty } from "assets/Icon/multipleEmpty.svg";
import { ReactComponent as MultipleFull } from "assets/Icon/multipleFull.svg";
import { ReactComponent as Checkbox } from "assets/Icon/checkbox.svg";
import { ReactComponent as CheckboxEmpty } from "assets/Icon/checkboxEmpty.svg";
import { ReactComponent as CheckboxFull } from "assets/Icon/checkboxFull.svg";
import { ReactComponent as Dropdown } from "assets/Icon/dropdown.svg";
import { ReactComponent as Close } from "assets/Icon/close.svg";
import { ReactComponent as Copy } from "assets/Icon/copy.svg";
import { ReactComponent as DragIndicator } from "assets/Icon/dragIndicator.svg";
import { ReactComponent as Add } from "assets/Icon/add.svg";
import { ReactComponent as Error } from "assets/Icon/error.svg";
import { ReactComponent as Chain } from "assets/Icon/chain.svg";
import { ReactComponent as Logo } from "assets/Icon/logo.svg";
import { ReactComponent as Left } from "assets/Icon/left.svg";
import { ReactComponent as Right } from "assets/Icon/right.svg";
import { ReactComponent as BulletinBoard } from "assets/Icon/bulletinBoard.svg";
import { ReactComponent as Form } from "assets/Icon/form.svg";
import Container from "./style";
import { IconProps } from "./type";

function Icon({ type, size, fill }: IconProps) {
  return (
    <Container size={size}>
      {type === "plus" && <Plus height={size} width={size} fill={fill} />}
      {type === "kebab" && <Kebab height={size} width={size} />}
      {type === "trashcan" && <TrashCan height={size} width={size} />}
      {type === "text" && <Text height={size} width={size} />}
      {type === "github" && <Github height={size} width={size} />}
      {type === "paragraph" && <Paragraph height={size} width={size} />}
      {type === "multiple" && <Multiple height={size} width={size} />}
      {type === "multipleEmpty" && <MultipleEmpty height={size} width={size} fill={fill} />}
      {type === "multipleFull" && <MultipleFull height={size} width={size} fill={fill} />}
      {type === "checkbox" && <Checkbox height={size} width={size} />}
      {type === "checkboxEmpty" && <CheckboxEmpty height={size} width={size} fill={fill} />}
      {type === "checkboxFull" && <CheckboxFull height={size} width={size} fill={fill} />}
      {type === "dropdown" && <Dropdown height={size} width={size} />}
      {type === "close" && <Close height={size} width={size} />}
      {type === "copy" && <Copy height={size} width={size} />}
      {type === "dragIndicator" && <DragIndicator height={size} width={size} fill={fill} />}
      {type === "add" && <Add height={size} width={size} />}
      {type === "error" && <Error height={size} width={size} fill={fill} />}
      {type === "chain" && <Chain height={size} width={size} fill={fill} />}
      {type === "logo" && <Logo height={size} width={size} fill={fill} />}
      {type === "left" && <Left height={size} width={size} fill={fill} />}
      {type === "right" && <Right height={size} width={size} fill={fill} />}
      {type === "bulletinBoard" && <BulletinBoard height={size} width={size} fill={fill} />}
      {type === "form" && <Form height={size} width={size} fill={fill} />}
    </Container>
  );
}

export default Icon;
