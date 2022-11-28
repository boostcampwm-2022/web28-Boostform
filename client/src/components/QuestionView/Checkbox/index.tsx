import React, { useState } from "react";
import { QuestionState } from "types/form.type";
import Icon from "components/Icon";

import * as S from "./style";

function Checkbox({ questionState }: { questionState: QuestionState }) {
  const { option } = questionState;
  const [selected, setSelected] = useState(-1);

  return (
    <S.Container>
      {option.map(({ choiceId, value }, index) => (
        <S.ObjectiveWrapper key={choiceId}>
          {selected !== index && (
            <S.CheckIconButton type="button" onClick={() => setSelected(index)}>
              <Icon type="checkboxEmpty" size="20px" />
            </S.CheckIconButton>
          )}
          {selected === index && (
            <S.CheckIconButton type="button" onClick={() => setSelected(-1)}>
              <Icon type="checkboxFull" size="20px" fill="#3c64b1" />
            </S.CheckIconButton>
          )}
          <S.Option>{value}</S.Option>
        </S.ObjectiveWrapper>
      ))}
    </S.Container>
  );
}

export default Checkbox;
