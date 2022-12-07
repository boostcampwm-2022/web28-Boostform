import styled from "styled-components";

const Container = styled.section`
  min-width: 1024px;
  margin: 0 32px;
`;

const HeaderContainer = styled.div`
  margin-top: 24px;
  margin-bottom: 15px;
`;

const NewFormText = styled.span`
  margin-left: 4px;
`;

const FormListContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  border: none;
  border-radius: 3px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 10px;
`;

const GridBox = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  grid-template-rows: repeat(2, minmax(0, 20px));
`;

const Flicker = styled.span`
  font-size: ${({ theme }) => theme.fontSize.sz14};
`;

export { Container, FormListContainer, ButtonContainer, GridBox, Flicker, HeaderContainer, NewFormText };
