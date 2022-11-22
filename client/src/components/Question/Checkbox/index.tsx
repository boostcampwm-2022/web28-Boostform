import React from "react";
import Icon from "components/Icon/Icon.component";
import { ChoiceWrapper, Input, DeleteButton, AddOptionWrapper, AddOptionButton } from "./Checkbox.style";

interface QuestionState {
  questionId: number;
  page: number;
  type: "checkbox" | "multiple" | "paragraph";
  essential: boolean;
  etcAdded: boolean;
  title: string;
  option: {
    choiceId: number;
    value: string;
  }[];
}

function Checkbox({
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
  const { option } = questionState;

  return (
    <div>
      {option.map(({ choiceId, value }, choiceIndex) => (
        <ChoiceWrapper key={choiceId}>
          <Icon type="checkboxEmpty" size="20px" fill="#aeaeae" />
          <Input value={value} onInput={(e) => modifyChoice(index, choiceIndex, e.currentTarget.value)} />
          {questionState.option.length > 1 && (
            <DeleteButton type="button" onClick={() => deleteChoice(index, choiceIndex)}>
              <Icon type="close" size="16px" />
            </DeleteButton>
          )}
        </ChoiceWrapper>
      ))}
      <ChoiceWrapper>
        <Icon type="checkboxEmpty" size="20px" fill="#aeaeae" />
        <AddOptionWrapper>
          <AddOptionButton type="button" onClick={() => addQuestionChoice(index)}>
            옵션 추가
          </AddOptionButton>
        </AddOptionWrapper>
      </ChoiceWrapper>
    </div>
  );
}

export default Checkbox;
