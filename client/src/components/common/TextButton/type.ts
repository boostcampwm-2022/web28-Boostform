interface TextButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  color?: string;
  fontSize?: string;
}

interface StyledTextButtonProps {
  color?: string;
  fontSize?: string;
}

export type { TextButtonProps, StyledTextButtonProps };
