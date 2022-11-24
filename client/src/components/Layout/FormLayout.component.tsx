import React from "react";
import Main from "./FormLayout.style";

function FormLayout({ children, backgroundColor }: { backgroundColor: "white" | "blue"; children: React.ReactNode }) {
  return <Main backgroundColor={backgroundColor}>{children}</Main>;
}

export default FormLayout;
