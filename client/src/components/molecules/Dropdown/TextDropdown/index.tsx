import React, { createContext, useContext, useMemo, useState } from "react";
import Icon from "components/atoms/Icon";
import OutsideDetecter from "hooks/useOutsideDetecter";
import theme from "styles/theme";
import * as S from "./style";

const TextDropdownContext = createContext<{
  open: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  selected?: string;
  setSelected?: React.Dispatch<React.SetStateAction<string>>;
  fontSize: string;
}>({ open: false, fontSize: "" });

function Dropdown({
  children,
  state,
  defaultState,
  fontSize = "",
}: {
  state: string;
  defaultState: string;
  fontSize?: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<string>(state || defaultState);

  const DropdownContextValue = useMemo(
    () => ({ open, setOpen, selected, setSelected, fontSize }),
    [open, selected, fontSize]
  );

  return (
    <TextDropdownContext.Provider value={DropdownContextValue}>
      <S.Container>{children}</S.Container>
    </TextDropdownContext.Provider>
  );
}

Dropdown.defaultProps = {
  fontSize: "",
};

function Head({
  border = theme.colors.grey3,
  padding = "10px",
  color = theme.colors.black,
  bold = false,
}: {
  border?: string;
  padding?: string;
  color?: string;
  bold?: boolean;
}) {
  const { setOpen, selected, fontSize } = useContext(TextDropdownContext);

  return (
    <S.Button
      border={border}
      padding={padding}
      type="button"
      fontSize={fontSize}
      color={color}
      bold={bold}
      onClick={(e) => {
        e.stopPropagation();
        if (setOpen) setOpen((prev) => !prev);
      }}
    >
      <S.DropdownText>{selected}</S.DropdownText>
      <Icon type="dropdown" size="16px" />
    </S.Button>
  );
}

Head.defaultProps = {
  border: theme.colors.grey3,
  padding: "10px",
  color: theme.colors.black,
  bold: false,
};

function ItemList({ children, custom = "" }: { children: React.ReactNode; custom?: string }) {
  const { open, setOpen } = useContext(TextDropdownContext);

  return open ? (
    <OutsideDetecter callback={() => setOpen && setOpen(false)}>
      <S.Content custom={custom}>{children}</S.Content>
    </OutsideDetecter>
  ) : null;
}

ItemList.defaultProps = {
  custom: "",
};

function Item({ value, onClick }: { value: string; onClick: () => void }) {
  const { setSelected, setOpen, fontSize } = useContext(TextDropdownContext);

  return (
    <li>
      <S.DropdownButton
        type="button"
        fontSize={fontSize}
        onClick={(e) => {
          e.stopPropagation();
          if (setSelected) setSelected(value);
          if (setOpen) setOpen(false);
          onClick();
        }}
      >
        <S.DropdownText>{value}</S.DropdownText>
      </S.DropdownButton>
    </li>
  );
}

const TextDropdown = Object.assign(Dropdown, { Head, Item, ItemList });

export default TextDropdown;

// function Dropdown2({ state, setState, items, defaultState }: TextDropdownProps) {
//   const [open, setOpen] = useState(false);
//   const [selected, setSelected] = useState<string>(state || defaultState);

//   return (
//     <S.Container>
//       <S.Button
//         type="button"
//         onClick={(e) => {
//           e.stopPropagation();
//           setOpen((prev) => !prev);
//         }}
//       >
//         <S.DropdownText>{selected}</S.DropdownText>
//         <Icon type="dropdown" size="16px" />
//       </S.Button>

//       {open && (
//         <OutsideDetecter callback={() => setOpen(false)}>
//           <S.Content>
//             {items.map((value) => (
//               <li key={value}>
//                 <S.DropdownButton
//                   type="button"
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     setSelected(value);
//                     setOpen(false);
//                     setState(value);
//                   }}
//                 >
//                   <S.DropdownText>{value}</S.DropdownText>
//                 </S.DropdownButton>
//               </li>
//             ))}
//           </S.Content>
//         </OutsideDetecter>
//       )}
//     </S.Container>
//   );
// }

// export default Dropdown;
