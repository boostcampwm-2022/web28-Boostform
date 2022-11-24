import React from "react";
import Main from "./Layout.style";
import LayoutProps from "./Layout.type";

function Layout({ children, backgroundColor }: LayoutProps) {
  return <Main backgroundColor={backgroundColor}>{children}</Main>;
}

export default Layout;
