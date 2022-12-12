import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "components/common/Button";
import theme from "styles/theme";
import * as S from "./style";

function LoginModal({ closeModal }: { closeModal: () => void }) {
  const navigate = useNavigate();

  const onClickLogin = () => {
    closeModal();
    navigate("/login");
  };

  return (
    <S.Container>
      <S.Title>계속 하려면 로그인</S.Title>
      <S.Text>이 설문지를 작성하려면 로그인해야 합니다. 신원은 익명으로 유지됩니다.</S.Text>
      <S.ButtonContainer>
        <Button
          type="button"
          onClick={onClickLogin}
          backgroundColor={theme.colors.white}
          border={theme.colors.blue2}
          color={theme.colors.blue2}
          fontSize={theme.fontSize.sz12}
          hover={theme.colors.blue0}
          active
        >
          로그인
        </Button>
      </S.ButtonContainer>
    </S.Container>
  );
}

export default LoginModal;
