import React from "react";
import { AnswerTotal } from "types/result";
import * as S from "./style";

function Paragraph({ answerTotal }: { answerTotal: AnswerTotal }) {
  const values = Object.entries(answerTotal);
  const moreThanTenElements = values.length > 10;

  return (
    <S.Container scroll={moreThanTenElements}>
      {values.map(([key, value]) => (
        <S.ListElement key={`${key}${value}`}>{key}</S.ListElement>
      ))}
    </S.Container>
  );
}

export default Paragraph;
