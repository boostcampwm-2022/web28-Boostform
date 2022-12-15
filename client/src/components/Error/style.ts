import styled from "styled-components";

const Container = styled.section`
  margin-top: 64px;
  min-width: 1024px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const H2 = styled.p`
  text-align: center;
  display: block;
  margin-bottom: 32px;
  color: ${({ theme }) => theme.colors.grey7};
`;

const H1 = styled.h1`
  text-align: center;
  font-size: 60px;
  max-width: 600px;
  line-height: 72px;
  margin-top: 64px;
  color: ${({ theme }) => theme.colors.blue3};
`;

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export { Container, H2, H1, ButtonWrapper };
