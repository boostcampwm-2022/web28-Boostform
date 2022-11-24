import React from "react";
import Icon from "components/Icon";
import { QuestionState } from "types/form.type";
import { Container, ObjectiveWrapper, Option } from "./Objective.style";

function Objective({ questionState }: { questionState: QuestionState }) {
  const { option, type } = questionState;

  return (
    <Container>
      {option.map(({ choiceId, value }) => (
        <ObjectiveWrapper key={choiceId}>
          {type === "checkbox" && <Icon type="checkboxEmpty" size="20px" fill="#aeaeae" />}
          {type === "multiple" && <Icon type="multipleEmpty" size="20px" fill="#aeaeae" />}
          <Option>{value}</Option>
        </ObjectiveWrapper>
      ))}
    </Container>
  );
}

export default Objective;
