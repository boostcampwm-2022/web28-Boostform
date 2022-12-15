import React from "react";
import Icon from "components/common/Icon";
import { IconType } from "components/common/Icon/type";
import IconButtonComponent from "./style";

interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  type: "button" | "submit" | "reset";
  icon: IconType;
  fill?: string;
  size: string;
  active?: boolean;
  disabled?: boolean;
}

function IconButton({ size, type, active, fill, onClick, disabled, icon, style }: IconButtonProps) {
  return (
    <IconButtonComponent onClick={onClick} disabled={disabled} active={active} type={type} style={style}>
      <Icon size={size} type={icon} fill={fill} />
    </IconButtonComponent>
  );
}

IconButton.defaultProps = {
  fill: "black",
  disabled: false,
  active: false,
};

export default IconButton;
