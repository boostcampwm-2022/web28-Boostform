import React from "react";
import { AnswerTotal } from "types/result";

function Paragraph({ answerTotal }: { answerTotal: AnswerTotal }) {
  const values = Object.entries(answerTotal);
  console.log(answerTotal);

  return (
    <div>
      {values.map(([key, value]) => (
        <div key={`${key}${value}`}>{key}</div>
      ))}
    </div>
  );
}

export default Paragraph;
