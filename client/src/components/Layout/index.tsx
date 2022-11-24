import React from "react";
import Main from "./Layout.style";

function Layout({ children, backgroundColor }: { backgroundColor: "white" | "blue"; children: React.ReactNode }) {
  return <Main backgroundColor={backgroundColor}>{children}</Main>;
}

export default Layout;
