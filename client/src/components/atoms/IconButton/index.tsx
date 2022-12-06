import React from "react";
import Icon from "components/atoms/Icon";
import { IconType } from "components/atoms/Icon/type";
import IconButtonComponent from "./style";

interface IconButtonProps {
  type: "button" | "submit" | "reset";
  icon: IconType;
  fill?: string;
  size: string;
  active?: boolean;
  onClick: () => void;
  disabled?: boolean;
  custom?: string;
}

function IconButton({ size, type, active, fill, onClick, disabled, custom, icon }: IconButtonProps) {
  return (
    <IconButtonComponent onClick={onClick} disabled={disabled} active={active} custom={custom} type={type}>
      <Icon size={size} type={icon} fill={fill} />
    </IconButtonComponent>
  );
}

IconButton.defaultProps = {
  fill: "black",
  disabled: false,
  active: false,
  custom: "",
};

export default IconButton;
