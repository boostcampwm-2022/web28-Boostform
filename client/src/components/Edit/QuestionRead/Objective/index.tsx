import React from "react";
import Icon from "components/common/Icon";
import { QuestionState } from "types/form";
import theme from "styles/theme";
import * as S from "./style";

function Objective({ questionState }: { questionState: QuestionState }) {
  const { option, type } = questionState;

  return (
    <S.Container>
      {option.map(({ choiceId, value }) => (
        <S.ObjectiveWrapper key={choiceId}>
          {type === "checkbox" && <Icon type="checkboxEmpty" size="20px" fill={theme.colors.grey3} />}
          {type === "multiple" && <Icon type="multipleEmpty" size="20px" fill={theme.colors.grey3} />}
          <S.Option>{value}</S.Option>
        </S.ObjectiveWrapper>
      ))}
    </S.Container>
  );
}

export default Objective;
