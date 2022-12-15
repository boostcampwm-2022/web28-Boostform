import styled from "styled-components";

const divContainer = styled.div`
  min-width: 1024px;
  margin: 0 32px;
`;

const divWrapper = styled.div``;

const divSearchBox = styled.form`
  margin-top: 36px;
  margin-bottom: 8px;
  display: flex;
`;

const inputSearch = styled.input`
  width: calc(100% - 60px);
  height: 37px;
  padding: 0 10px;
  border: 1px solid ${({ theme }) => theme.colors.grey3};
  border-radius: 3px;
  font-size: 12px;
  vertical-align: top;
`;

const divSortWrapper = styled.div`
  width: 100%;
  height: 32px;
  margin-bottom: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const divSortList = styled.div``;

const inputRadio = styled.input`
  visibility: hidden;
  &:checked + label {
    color: ${({ theme }) => theme.colors.blue3};
    font-weight: bold;
  }
`;
const labelRadio = styled.label`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.grey8};
  cursor: pointer;
`;

const spanCategoryText = styled.span`
  font-size: 12px;
  margin-right: 8px;
  line-height: 15px;
  vertical-align: center;
  color: ${({ theme }) => theme.colors.grey8};
`;

const divCategoryWrapper = styled.div`
  display: flex;
  align-items: center;
  padding-top: 6px;
`;

export {
  divContainer,
  divWrapper,
  divSearchBox,
  inputSearch,
  divSortWrapper,
  divSortList,
  inputRadio,
  labelRadio,
  spanCategoryText,
  divCategoryWrapper,
};
