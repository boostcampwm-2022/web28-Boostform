import styled, { css } from "styled-components";

const Container = styled.div`
  width: 760px;
`;

const HeadContainer = styled.div`
  margin-top: 12px;
  background-color: white;
  border-radius: 3px;
  padding: 10px 20px;
`;

const HeadTitle = styled.div`
  width: 100%;
  display: block;
  font-size: 32px;
  padding: 5px 0;
  border: none;
  font-family: Arial, Helvetica, sans-serif;
  line-height: 48px;
`;

const HeadDescription = styled.div`
  width: 100%;
  display: block;
  font-size: 16px;
  padding: 5px 0;
  border: none;
  font-family: Arial, Helvetica, sans-serif;
  line-height: 29px;
`;

const QuestionContainer = styled.div<{ isEssential: boolean }>`
  margin-top: 16px;
  background-color: white;
  border-radius: 3px;
  padding: 20px;
  ${({ isEssential }) =>
    isEssential &&
    css`
      border: 1px solid #d93025;
    `}
`;

const BottomContainer = styled.div`
  display: flex;
  justify-content: right;
  margin: 16px 0 32px;
  background-color: #ffffff;
  border-radius: 3px;
  padding: 20px;
`;

const SubmitButton = styled.button`
  background-color: #284b8f;
  color: #ffffff;
  padding: 8px 16px;
  border: 1px solid #aeaeae;
  border-radius: 8px;
  cursor: pointer;
`;

const Essential = styled.span`
  color: red;
  margin-left: 8px;
`;

export {
  Container,
  HeadContainer,
  HeadTitle,
  HeadDescription,
  QuestionContainer,
  BottomContainer,
  SubmitButton,
  Essential,
};
