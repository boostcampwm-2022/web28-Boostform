import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 35%;
  left: 50%;
  transform: translate(-50%, -50%);

  width: 400px;
  border-radius: 3px;
  padding: 36px;

  z-index: 2;
  background-color: white;
`;

const Text = styled.div`
  margin-bottom: 20px;
  font-size: 16px;
  font-weight: 400;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
`;

export { Container, Text, ButtonContainer };
