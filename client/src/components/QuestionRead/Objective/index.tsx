import React from "react";
import Icon from "components/Icon";
import { QuestionState } from "types/form";
import * as S from "./style";

function Objective({ questionState }: { questionState: QuestionState }) {
  const { option, type } = questionState;

  return (
    <S.Container>
      {option.map(({ choiceId, value }) => (
        <S.ObjectiveWrapper key={choiceId}>
          {type === "checkbox" && <Icon type="checkboxEmpty" size="20px" fill="#aeaeae" />}
          {type === "multiple" && <Icon type="multipleEmpty" size="20px" fill="#aeaeae" />}
          <S.Option>{value}</S.Option>
        </S.ObjectiveWrapper>
      ))}
    </S.Container>
  );
}

export default Objective;
