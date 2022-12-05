import styled from "styled-components";

const Container = styled.div`
  width: 90%;
  padding: 10px 0;
  margin: 12px 0 16px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.grey3};
  border-style: dotted;
  color: ${({ theme }) => theme.colors.grey5};
  font-size: 15px;
`;

export default Container;
