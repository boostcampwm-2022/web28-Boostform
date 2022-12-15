interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  color?: string;
  backgroundColor?: string;
  hover?: string;
  fontSize?: string;
  active?: boolean;
  border?: string;
}

interface StyledButtonProps {
  color?: string;
  backgroundColor?: string;
  hover?: string;
  fontSize?: string;
  active?: boolean;
  border?: string;
}

export type { ButtonProps, StyledButtonProps };
