import styled, { css } from "styled-components";

const Container = styled.div`
  width: 760px;
`;

const HeadContainer = styled.div`
  margin-top: 36px;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 3px;
  padding: 10px 20px;
  position: relative;
  overflow: hidden;
`;

const HeadTitle = styled.div`
  width: 100%;
  display: block;
  font-size: ${({ theme }) => theme.fontSize.sz24};
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
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 3px;
  padding: 20px;
  ${({ isEssential }) =>
    isEssential &&
    css`
      border: 1px solid ${({ theme }) => theme.colors.red1};
    `}

  position: relative;
  overflow: hidden;
`;

const BottomContainer = styled.div`
  display: flex;
  justify-content: right;
  margin: 16px 0 32px;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 3px;
  padding: 20px;
  position: relative;
  overflow: hidden;
`;

const Essential = styled.span`
  color: red;
  margin-left: 8px;
`;

const NoResponseForm = styled.div`
  font-size: 14px;
  font-weight: 400;
`;

export {
  Container,
  HeadContainer,
  HeadTitle,
  HeadDescription,
  QuestionContainer,
  BottomContainer,
  Essential,
  NoResponseForm,
};
