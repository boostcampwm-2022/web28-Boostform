import React, { createContext, useMemo, useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import authApi from "api/authApi";
import AuthContextProps from "./type";

export const AuthContext = createContext<AuthContextProps>({});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [auth, setAuth] = useState({ userID: "", userName: "" });
  const [cookies] = useCookies();

  useEffect(() => {
    if (cookies.accessToken)
      authApi.getUserInfo().then((userInfo) => {
        if (!setAuth) return;

        setAuth({ userID: userInfo.data.userID, userName: userInfo.data.userName });
      });
  }, [cookies]);

  const AuthContextValue = useMemo(() => ({ auth, setAuth }), [auth, setAuth]);

  return <AuthContext.Provider value={AuthContextValue}>{children}</AuthContext.Provider>;
}
