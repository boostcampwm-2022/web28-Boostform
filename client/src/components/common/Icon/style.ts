import styled from "styled-components";

const Container = styled.span<{ size: string }>`
  display: inline-block;
  height: ${({ size }) => size};
  width: ${({ size }) => size};
`;

export default Container;
