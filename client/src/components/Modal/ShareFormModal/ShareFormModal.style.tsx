import styled from "styled-components";

const Container = styled.div`
  position: absolute;
  top: 35%;
  left: 50%;
  transform: translate(-50%, -50%);

  width: 600px;
  border-radius: 9px;
  padding: 36px;

  z-index: 2;
  background-color: white;
`;

const Title = styled.div`
  font-size: 20px;
`;

const ToggleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 12px;
`;

const ButtonContainer = styled.div`
  margin-top: 12px;
  display: flex;
  justify-content: right;
`;

const Button = styled.button`
  background-color: #284b8f;
  color: #ffffff;
  padding: 8px 16px;
  border: 1px solid #aeaeae;
  border-radius: 8px;
  cursor: pointer;
  margin-left: 16px;
`;

export { Container, ToggleWrapper, Title, ButtonContainer, Button };
