import styled from "styled-components";

const Container = styled.div`
  width: 760px;
`;

const TitleContainer = styled.div`
  margin-top: 36px;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 3px;
  padding: 20px;
`;

const TitleInput = styled.input`
  width: 100%;
  display: block;
  font-size: ${({ theme }) => theme.fontSize.sz24};
  padding: 5px 0;
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.colors.grey3};
  font-family: Arial, Helvetica, sans-serif;
  line-height: 36px;

  &:focus {
    outline: none;
    border-bottom: 1px solid ${({ theme }) => theme.colors.black};
  }
`;

const DescriptionInput = styled.input`
  width: 100%;
  margin-top: 10px;
  margin-bottom: 16px;
  display: block;
  font-size: ${({ theme }) => theme.fontSize.sz16};
  padding: 5px 0;
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.colors.grey3};
  font-family: Arial, Helvetica, sans-serif;
  line-height: 29px;

  &:focus {
    outline: none;
    border-bottom: 1px solid ${({ theme }) => theme.colors.black};
  }
`;

const TitleRead = styled.div`
  width: 100%;
  display: block;
  font-size: ${({ theme }) => theme.fontSize.sz24};
  padding: 5px 0;
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.colors.grey3};
  font-family: Arial, Helvetica, sans-serif;
  line-height: 36px;
`;

const DescriptionRead = styled.div<{ isEmpty: boolean }>`
  width: 100%;
  margin-top: 10px;
  display: block;
  font-size: ${({ theme }) => theme.fontSize.sz16};
  padding: 5px 0;
  border: none;
  color: ${({ isEmpty, theme }) => (isEmpty ? theme.colors.grey5 : theme.colors.black)};
  border-bottom: 1px solid ${({ theme }) => theme.colors.grey3};
  font-family: Arial, Helvetica, sans-serif;
  line-height: 29px;
`;

const QuestionContainer = styled.div`
  margin-top: 16px;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 3px;
  padding: 0 20px 20px;
  border: solid 1px ${({ theme }) => theme.colors.grey3};
  position: relative;
  overflow: hidden;
`;

const QuestionHead = styled.div`
  display: flex;
  justify-content: space-between;
`;

const QuestionTitleInput = styled.input`
  width: 60%;
  display: block;
  font-size: 16px;
  padding: 8px 10px;
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.colors.grey3};
  font-family: Arial, Helvetica, sans-serif;
  background-color: ${({ theme }) => theme.colors.grey1};
  border-radius: 3px;
  line-height: 29px;

  &:focus {
    outline: none;
    border-bottom: 1px solid ${({ theme }) => theme.colors.black};
  }
`;

const QuestionBody = styled.div`
  padding: 10px 0;
`;

const HorizontalRule = styled.hr`
  height: 1px;
  border: 0;
  background-color: ${({ theme }) => theme.colors.grey2};
`;

const QuestionTail = styled.div`
  display: flex;
  align-items: center;
  justify-content: right;
  margin-top: 18px;
`;

const EssentialWrapper = styled.div`
  display: flex;
  align-items: center;
  border-left: 1px solid ${({ theme }) => theme.colors.grey3};
  padding: 8px 12px;
`;

const EssentialText = styled.span`
  font-size: 15px;
  margin-right: 8px;
`;

const TitleCategoryWrapper = styled.div`
  width: 150px;
  height: 41px;
  display: flex;
  align-items: center;
  margin-top: 16px;
  padding: 10px;
  border: 1px solid ${({ theme }) => theme.colors.grey3};
  border-radius: 3px;
  background-color: transparent;
  cursor: pointer;
`;

const TitleCategoryText = styled.span`
  text-align: left;
  margin-left: 8px;
  font-size: 13.3px;
  font-weight: 400;
  line-height: 16px;
  font-family: Arial, Helvetica, sans-serif;
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

const DragIndicator = styled.div`
  height: 30px;
  display: flex;
  justify-content: center;
  padding: 5px 0;
`;

export {
  Container,
  TitleContainer,
  QuestionContainer,
  TitleInput,
  DescriptionInput,
  TitleRead,
  DescriptionRead,
  QuestionHead,
  QuestionTitleInput,
  QuestionBody,
  HorizontalRule,
  QuestionTail,
  EssentialWrapper,
  EssentialText,
  TitleCategoryWrapper,
  TitleCategoryText,
  BottomContainer,
  DragIndicator,
};
