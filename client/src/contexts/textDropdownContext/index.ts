import { createContext } from "react";
import DropdownValueProps from "./type";

const TextDropdownContext = createContext<DropdownValueProps>({ open: false, fontSize: "" });

export default TextDropdownContext;
