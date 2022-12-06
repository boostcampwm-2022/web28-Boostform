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
  background-color: ${({ theme }) => theme.colors.white};
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

const CopyLinkText = styled.span`
  color: ${({ theme }) => theme.colors.blue4};
  margin-left: 6px;
`;

export { Container, ToggleWrapper, Title, ButtonContainer, CopyLinkText };
