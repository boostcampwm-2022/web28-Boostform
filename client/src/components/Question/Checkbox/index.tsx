import React from "react";
import Icon from "components/Icon/Icon.component";
import { ChoiceWrapper, Input } from "./Checkbox.style";

interface QuestionState {
  questionId: number;
  page: number;
  type: "checkbox" | "multiple" | "paragraph";
  essential: boolean;
  etcAdded: boolean;
  title: string;
  option: string[];
}

function Checkbox({
  index,
  questionState,
  addQuestionChoice,
  modifyChoice,
}: {
  index: number;
  questionState: QuestionState;
  addQuestionChoice: (idx: number) => void;
  modifyChoice: (questionIndex: number, choiceIndex: number, value: string) => void;
}) {
  const { option } = questionState;

  return (
    <div>
      {option.map((value, choiceIndex) => (
        <ChoiceWrapper>
          <Icon type="checkboxEmpty" size="20px" />
          <Input value={value} onInput={(e) => modifyChoice(index, choiceIndex, e.currentTarget.value)} />
        </ChoiceWrapper>
      ))}
      <ChoiceWrapper>
        <Icon type="checkboxEmpty" size="20px" />
        <div>
          <button type="button" onClick={() => addQuestionChoice(index)}>
            옵션 추가
          </button>
        </div>
      </ChoiceWrapper>
    </div>
  );
}

export default Checkbox;
