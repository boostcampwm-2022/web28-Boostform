import React, { useState } from "react";
import { useParams } from "react-router-dom";
import FormLayout from "components/Layout/FormLayout.component";
import Dropdown from "components/Dropdown";
import {
  Container,
  TitleContainer,
  QuestionContainer,
  TitleInput,
  DescriptionInput,
  TitleRead,
  DescriptionRead,
  QuestionHead,
  QuestionTitleInput,
} from "./Create.style";

function Create() {
  const { id } = useParams();
  const [title, setTitle] = useState({ title: "제목없음", description: "" });
  const [questions, setQuestions] = useState<
    { qId: string; qTitle: string; qType: "checkbox" | "multiple" | "paragraph" }[]
  >([
    { qId: "a", qTitle: "질문", qType: "checkbox" },
    { qId: "b", qTitle: "질문", qType: "checkbox" },
    { qId: "c", qTitle: "질문", qType: "checkbox" },
  ]);
  const [focus, setFocus] = useState(-1);

  const onClickTitle = () => {
    setFocus(-1);
  };

  const onClickQuestion = (index: number) => {
    setFocus(index);
  };

  const onInputTitle: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setTitle((prev) => ({ description: prev.description, title: e.target.value }));
  };

  const onInputDescription: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setTitle((prev) => ({ description: e.target.value, title: prev.title }));
  };

  const onInputQuestionTitle = (value: string, index: number) => {
    setQuestions((prev) => {
      const left = prev.slice(0, index);
      const curr = { ...prev[index], qTitle: value };
      const right = prev.slice(index + 1);
      return [...left, curr, ...right];
    });
  };

  const onClickSetQuestionType = (type: "checkbox" | "multiple" | "paragraph", index: number) => {
    setQuestions((prev) => {
      const left = prev.slice(0, index);
      const curr = { ...prev[index], qType: type };
      const right = prev.slice(index + 1);
      return [...left, curr, ...right];
    });
  };

  return (
    <FormLayout>
      <Container>
        <TitleContainer onClick={() => onClickTitle()}>
          {focus !== -1 && (
            <>
              <TitleRead>{title.title}</TitleRead>
              <DescriptionRead>{title.description ? title.description : "Form description"}</DescriptionRead>
            </>
          )}
          {focus === -1 && (
            <>
              <TitleInput onInput={onInputTitle} value={title.title} />
              <DescriptionInput onInput={onInputDescription} value={title.description} placeholder="Form description" />
            </>
          )}
        </TitleContainer>
        {questions.map(({ qId, qTitle, qType }, index) => (
          <QuestionContainer key={qId} onClick={() => onClickQuestion(index)}>
            {focus === index && (
              <>
                <QuestionHead>
                  <QuestionTitleInput
                    onInput={(e) => onInputQuestionTitle(e.currentTarget.value, index)}
                    value={questions[index].qTitle}
                    placeholder="질문"
                  />
                  <Dropdown
                    state={qType}
                    setState={(questionType) => {
                      onClickSetQuestionType(questionType, index);
                    }}
                  />
                </QuestionHead>
                <div>body</div>
                <div>tail</div>
              </>
            )}
            {focus !== index && (
              <>
                <div>{qTitle}</div>
                <div>body</div>
              </>
            )}
          </QuestionContainer>
        ))}
      </Container>
    </FormLayout>
  );
}

export default Create;
