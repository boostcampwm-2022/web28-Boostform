import React from "react";
import Main from "./FormLayout.style";

function FormLayout({ children }: { children: React.ReactNode }) {
  return <Main>{children}</Main>;
}

export default FormLayout;
