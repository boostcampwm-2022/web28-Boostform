import React from "react";
import Icon from "components/Icon";
import { QuestionState } from "types/form.type";
import { ChoiceWrapper, Input, DeleteButton, AddOptionWrapper, AddOptionButton } from "./Objective.style";

function Objective({
  index,
  questionState,
  addQuestionChoice,
  modifyChoice,
  deleteChoice,
}: {
  index: number;
  questionState: QuestionState;
  addQuestionChoice: (idx: number) => void;
  modifyChoice: (questionIndex: number, choiceIndex: number, value: string) => void;
  deleteChoice: (questionIndex: number, choiceIndex: number) => void;
}) {
  const { option, type } = questionState;

  return (
    <div>
      {option.map(({ choiceId, value }, choiceIndex) => (
        <ChoiceWrapper key={choiceId}>
          {type === "checkbox" && <Icon type="checkboxEmpty" size="20px" fill="#aeaeae" />}
          {type === "multiple" && <Icon type="multipleEmpty" size="20px" fill="#aeaeae" />}
          <Input value={value} onInput={(e) => modifyChoice(index, choiceIndex, e.currentTarget.value)} />
          {questionState.option.length > 1 && (
            <DeleteButton type="button" onClick={() => deleteChoice(index, choiceIndex)}>
              <Icon type="close" size="16px" />
            </DeleteButton>
          )}
        </ChoiceWrapper>
      ))}
      <ChoiceWrapper>
        {type === "checkbox" && <Icon type="checkboxEmpty" size="20px" fill="#aeaeae" />}
        {type === "multiple" && <Icon type="multipleEmpty" size="20px" fill="#aeaeae" />}
        <AddOptionWrapper>
          <AddOptionButton type="button" onClick={() => addQuestionChoice(index)}>
            옵션 추가
          </AddOptionButton>
        </AddOptionWrapper>
      </ChoiceWrapper>
    </div>
  );
}

export default Objective;
