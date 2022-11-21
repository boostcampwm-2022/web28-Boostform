import React, { useState } from "react";
import { useParams } from "react-router-dom";
import FormLayout from "components/Layout/FormLayout.component";
import {
  Container,
  TitleContainer,
  QuestionContainer,
  TitleInput,
  DescriptionInput,
  TitleRead,
  DescriptionRead,
} from "./Create.style";

function Create() {
  const { id } = useParams();
  const [title, setTitle] = useState({ title: "Untitle Form", description: "" });
  const [questions, setQuestions] = useState([
    { idv: "a", t: "question1" },
    { idv: "b", t: "question2" },
    { idv: "c", t: "question3" },
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
      const curr = { ...prev[index], t: value };
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
        {questions.map(({ idv, t }, index) => (
          <QuestionContainer key={idv} onClick={() => onClickQuestion(index)}>
            {focus === index && (
              <>
                <div>
                  <input
                    onInput={(e) => onInputQuestionTitle(e.currentTarget.value, index)}
                    value={questions[index].t}
                  />
                </div>
                <div>body</div>
                <div>tail</div>
              </>
            )}
            {focus !== index && (
              <>
                <div>{t}</div>
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
