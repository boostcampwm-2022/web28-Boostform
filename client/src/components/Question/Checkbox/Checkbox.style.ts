import styled from "styled-components";

const Container = styled.div``;

const ChoiceWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Input = styled.input`
  width: 60%;
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

export { Container, ChoiceWrapper, Input };
