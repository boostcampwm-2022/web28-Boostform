import styled from "styled-components";

const Container = styled.div``;

const ChoiceWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 5px;
`;

const Input = styled.input`
  width: calc(100% - 77px);
  border: none;

  font-family: Arial, Helvetica, sans-serif;
  border-bottom: 1px solid ${({ theme }) => theme.colors.white};
  line-height: 29px;
  margin-left: 8px;

  &:hover {
    border-bottom: 1px solid ${({ theme }) => theme.colors.grey3};
  }

  &:focus {
    outline: none;
    border-bottom: 1px solid ${({ theme }) => theme.colors.black};
  }
`;

const AddOptionWrapper = styled.div`
  margin-left: 8px;
`;

export { Container, ChoiceWrapper, Input, AddOptionWrapper };
