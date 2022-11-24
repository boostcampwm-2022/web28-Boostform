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
  border-bottom: 1px solid #ffffff;
  line-height: 29px;
  margin-left: 8px;

  &:hover {
    border-bottom: 1px solid #afafaf;
  }

  &:focus {
    outline: none;
    border-bottom: 1px solid #000000;
  }
`;

const DeleteButton = styled.button`
  background-color: transparent;
  border: 0;
  cursor: pointer;
  margin-left: 12px;
`;

const AddOptionWrapper = styled.div`
  margin-left: 8px;
`;

const AddOptionButton = styled.button`
  border: 0;
  padding: 5px 0;
  background-color: transparent;
  cursor: pointer;
  color: #828282;
`;

export { Container, ChoiceWrapper, Input, DeleteButton, AddOptionWrapper, AddOptionButton };
