import styled from "styled-components";

const Container = styled.div`
  margin-top: 20px;
`;

const MultipleWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 5px;
`;

const Option = styled.div`
  font-size: 14px;
  line-height: 29px;
  margin-left: 8px;
`;

const MultipleIconButton = styled.button`
  margin: 0;
  padding: 0;
  background-color: transparent;
  border: 0;
`;

const VaidationWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 8px;
  font-size: 12px;
  color: #d93025;
`;

const ValidationText = styled.span`
  margin-left: 5px;
`;

export { Container, MultipleWrapper, Option, MultipleIconButton, VaidationWrapper, ValidationText };
