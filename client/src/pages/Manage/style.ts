import styled from "styled-components";

const Container = styled.section`
  min-width: 1024px;
  margin: 0 32px;
`;

const FormListContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.grey3};
  border-radius: 3px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 10px;
`;

export { Container, FormListContainer, ButtonContainer };
