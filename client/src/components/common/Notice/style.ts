import styled from "styled-components";

const Container = styled.p<{ color: string; backgroundColor: string; border: string }>`
  margin: 16px 0;
  padding: 16px 0;
  text-align: center;
  font-weight: 500;
  font-size: ${({ theme }) => theme.fontSize.sz14};
  color: ${({ color }) => color};
  background-color: ${({ backgroundColor }) => backgroundColor};
  border: ${({ border }) => (border === "none" ? "none" : `1px solid ${border}`)};
`;

export default Container;
