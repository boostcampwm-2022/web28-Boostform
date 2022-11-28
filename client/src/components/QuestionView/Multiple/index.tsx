import React, { useState } from "react";
import { QuestionState } from "types/form.type";
import Icon from "components/Icon";
import * as S from "./style";

function Multiple({ questionState }: { questionState: QuestionState }) {
  const { option } = questionState;
  const [selected, setSelected] = useState<number[]>([]);

  return (
    <S.Container>
      {option.map(({ choiceId, value }, index) => (
        <S.ObjectiveWrapper key={choiceId}>
          {!selected.includes(index) && (
            <S.MultipleIconButton type="button" onClick={() => setSelected((prev) => [...prev, index])}>
              <Icon type="multipleEmpty" size="20px" />
            </S.MultipleIconButton>
          )}
          {selected.includes(index) && (
            <S.MultipleIconButton type="button" onClick={() => setSelected((prev) => prev.filter((v) => v !== index))}>
              <Icon type="multipleFull" size="20px" fill="#3c64b1" />
            </S.MultipleIconButton>
          )}
          <S.Option>{value}</S.Option>
        </S.ObjectiveWrapper>
      ))}
    </S.Container>
  );
}

export default Multiple;
