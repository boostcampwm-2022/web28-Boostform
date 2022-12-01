import React from "react";
import Main from "./style";
import LayoutProps from "./type";

function Layout({ children, backgroundColor }: LayoutProps) {
  return <Main backgroundColor={backgroundColor}>{children}</Main>;
}

export default Layout;
