import styled from "styled-components";

const Container = styled.div`
  position: absolute;
  top: 35%;
  left: 50%;
  transform: translate(-50%, -50%);

  width: 400px;
  border-radius: 9px;
  padding: 20px;

  z-index: 2;
  background-color: white;
`;

const button = styled.button``;

export { Container, button };
