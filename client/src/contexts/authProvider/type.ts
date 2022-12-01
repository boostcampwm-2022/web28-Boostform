import React from "react";

interface AuthProps {
  userID: string;
  userName: string;
}

interface AuthContextProps {
  auth?: AuthProps;
  setAuth?: React.Dispatch<React.SetStateAction<AuthProps>>;
}

export default AuthContextProps;
