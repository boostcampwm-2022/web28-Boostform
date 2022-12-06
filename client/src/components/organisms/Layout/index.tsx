import React from "react";
import Header from "components/organisms/Header";
import Main from "./style";
import LayoutProps from "./type";

function Layout({ children, backgroundColor }: LayoutProps) {
  return (
    <>
      <Header />
      <Main backgroundColor={backgroundColor}>{children}</Main>
    </>
  );
}

export default Layout;
