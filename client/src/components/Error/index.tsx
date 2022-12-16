import React, { useCallback, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useRouteError } from "react-router-dom";
import { AuthContext } from "contexts/authProvider";
import FormLayout from "components/template/Layout";
import Button from "components/common/Button";
import theme from "styles/theme";
import * as S from "./style";

interface AxiosErrorType {
  response: { status: number };
}
type AxiosError = AxiosErrorType;

interface RouterErrorType {
  status: number;
}
type RouterError = RouterErrorType;

type ErrorType = AxiosError | RouterError;

function Error() {
  const error = useRouteError() as ErrorType;

  const navigate = useNavigate();
  const { setAuth } = useContext(AuthContext);
  const [status, setStatus] = useState({ code: 404, message: "죄송합니다. 원하시는 페이지를 찾을 수가 없습니다." });

  const errorIsAxiosError = useCallback(
    (err: ErrorType): err is AxiosError => {
      if (axios.isAxiosError(error)) return true;
      return false;
    },
    [error]
  );

  useEffect(() => {
    let statusCode: number;

    if (errorIsAxiosError(error)) statusCode = error.response.status;
    else statusCode = error.status;

    if (statusCode === 400) setStatus({ code: 400, message: "죄송합니다. 페이지를 표시할 수 없습니다." });
    if (statusCode === 401) {
      setStatus({ code: 401, message: "죄송합니다. 사용 권한이 없습니다. 로그인 부탁드립니다." });
      if (setAuth) setAuth({ userId: "", userName: "" });
    }
    if (statusCode === 404) setStatus({ code: 404, message: "죄송합니다. 원하시는 페이지를 찾을 수가 없습니다." });
    if (statusCode === 500) setStatus({ code: 500, message: "죄송합니다. 페이지를 표시할 수 없습니다." });
  }, [error, errorIsAxiosError, setAuth]);

  return (
    <FormLayout backgroundColor="white">
      <S.Container>
        <S.H1>{status.code}</S.H1>
        <S.H2>{status.message}</S.H2>
        <S.ButtonWrapper>
          <Button
            type="button"
            border={theme.colors.blue3}
            backgroundColor={theme.colors.white}
            color={theme.colors.blue3}
            onClick={() => navigate("/")}
          >
            홈으로 이동
          </Button>
          {status.code === 401 ? (
            <Button
              type="button"
              border={theme.colors.blue3}
              backgroundColor={theme.colors.blue3}
              color={theme.colors.white}
              onClick={() => navigate("/login")}
              style={{ marginLeft: "8px" }}
            >
              로그인하기
            </Button>
          ) : null}
        </S.ButtonWrapper>
      </S.Container>
    </FormLayout>
  );
}

export default Error;
