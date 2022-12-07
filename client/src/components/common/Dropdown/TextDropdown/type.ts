interface DropdownProps {
  state: string;
  defaultState: string;
  fontSize?: string;
  children: React.ReactNode;
}

interface HeadProps {
  border?: string;
  padding?: string;
  color?: string;
  bold?: boolean;
}

interface ItemProps {
  value: string;
  onClick: () => void;
}

interface ItemListProps {
  children: React.ReactNode;
  custom?: string;
}

export type { DropdownProps, HeadProps, ItemProps, ItemListProps };
