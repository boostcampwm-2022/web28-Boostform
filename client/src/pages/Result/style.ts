import styled from "styled-components";

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

const ToggleWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const ToggleText = styled.span`
  margin-right: 12px;
`;

const ResponseCountWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 8px;
  margin-bottom: 8px;
`;

const ResponseCount = styled.span`
  font-size: 20px;
`;

const QuestionContainer = styled.div`
  margin-top: 16px;
  background-color: white;
  border-radius: 3px;
  padding: 20px;
`;

export {
  Container,
  HeadContainer,
  HeadTitle,
  ToggleWrapper,
  ToggleText,
  ResponseCountWrapper,
  ResponseCount,
  QuestionContainer,
};
