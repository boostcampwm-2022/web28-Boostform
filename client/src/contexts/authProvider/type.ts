import React from "react";

interface AuthProps {
  userId: string;
  userName: string;
  isSuccess?: boolean;
}

interface AuthContextProps {
  auth?: AuthProps;
  setAuth?: React.Dispatch<React.SetStateAction<AuthProps>>;
  isSuccess?: boolean;
}

export type { AuthContextProps, AuthProps };
