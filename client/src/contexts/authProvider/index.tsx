import React, { createContext, useMemo, useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useCookies } from "react-cookie";
import authApi from "api/authApi";
import { AuthContextProps, AuthProps } from "./type";

export const AuthContext = createContext<AuthContextProps>({});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [auth, setAuth] = useState<AuthProps>({ userId: "", userName: "", isSuccess: false });
  const [cookies] = useCookies();

  const fetchUserId = (): Promise<{ userID: string; userName: string }> =>
    authApi.getUserInfo(cookies.accessToken as string | null);
  const { data, isSuccess } = useQuery({
    queryKey: ["userId"],
    queryFn: fetchUserId,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (isSuccess) setAuth({ userId: data.userID, userName: data.userName, isSuccess });
  }, [data, isSuccess]);

  const AuthContextValue = useMemo(() => ({ auth, setAuth }), [auth, setAuth]);

  return <AuthContext.Provider value={AuthContextValue}>{children}</AuthContext.Provider>;
}
