import styled from "styled-components";

const ParagraphInput = styled.input`
  width: 100%;
  margin-top: 10px;
  display: block;
  padding: 5px 0;
  border: none;
  border-bottom: 1px solid #afafaf;
  font-family: Arial, Helvetica, sans-serif;
  line-height: 29px;

  &:focus {
    outline: none;
    border-bottom: 1px solid #000000;
  }
`;

export default ParagraphInput;
