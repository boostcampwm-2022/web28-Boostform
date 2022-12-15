import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import FormLayout from "components/template/Layout";
import Button from "components/common/Button";
import theme from "styles/theme";
import * as S from "./style";

function Error() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [status, setStatus] = useState({ code: 404, message: "죄송합니다. 원하시는 페이지를 찾을 수가 없습니다." });

  useEffect(() => {
    if (state === 400) setStatus({ code: 400, message: "죄송합니다. 페이지를 표시할 수 없습니다." });
    if (state === 404) setStatus({ code: 404, message: "죄송합니다. 원하시는 페이지를 찾을 수가 없습니다." });
    if (state === 500) setStatus({ code: 500, message: "죄송합니다. 페이지를 표시할 수 없습니다." });
  }, [state]);

  return (
    <FormLayout backgroundColor="white">
      <S.Container>
        <S.H1>{status.code}</S.H1>
        <S.H2>{status.message}</S.H2>
        <Button
          type="button"
          border={theme.colors.blue3}
          backgroundColor={theme.colors.white}
          color={theme.colors.blue3}
          onClick={() => navigate("/")}
        >
          홈으로 이동
        </Button>
      </S.Container>
    </FormLayout>
  );
}

export default Error;
