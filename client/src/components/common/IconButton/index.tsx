import React from "react";
import Icon from "components/common/Icon";
import IconButtonComponent from "./style";
import { IconButtonProps } from "./type";

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
