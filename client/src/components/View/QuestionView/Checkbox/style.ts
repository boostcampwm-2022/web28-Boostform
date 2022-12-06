import styled from "styled-components";

const Container = styled.div`
  margin-top: 20px;
`;

const ObjectiveWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 5px;
`;

const Option = styled.div`
  font-size: 14px;
  line-height: 29px;
  margin-left: 8px;
`;

const VaidationWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 8px;
  font-size: 12px;
  color: ${({ theme }) => theme.colors.red1};
`;

const ValidationText = styled.span`
  margin-left: 5px;
`;

export { Container, ObjectiveWrapper, Option, VaidationWrapper, ValidationText };
