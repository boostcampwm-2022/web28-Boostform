import styled from "styled-components";

const divContainer = styled.div`
  min-width: 1024px;
  margin: 0 32px;
`;

const divWrapper = styled.div``;

const h1Title = styled.h1`
  margin-top: 60px;
  font-size: 24px;
  font-weight: 500;
  text-align: center;
`;

const pDescription = styled.p`
  margin-top: 12px;
  text-align: center;
  font-size: 14px;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.grey5};
`;

const divSearchBox = styled.div`
  margin-top: 36px;
  margin-bottom: 8px;
  display: flex;
`;

const inputSearch = styled.input`
  width: 900px;
  height: 37px;
  padding: 0 10px;
  border: 1px solid ${({ theme }) => theme.colors.grey3};
  border-radius: 3px;
  font-size: 12px;
  vertical-align: top;
`;

const divFormList = styled.div`
  padding-top: 17px;
  border-top: 2px solid ${({ theme }) => theme.colors.grey8};
`;

const divFormItem = styled.div`
  padding: 24px 19px 19px;
  border: 1px solid ${({ theme }) => theme.colors.grey3};
  margin-top: 7px;

  &:first-child {
    margin-top: 0;
  }
`;

const h3ItemTitle = styled.h3`
  margin-bottom: 6px;
  font-size: 16px;
  font-weight: 600;
`;

const spanItemDate = styled.span`
  font-size: 14px;
  color: #777;
`;

const divItemButtonWrapper = styled.div`
  display: flex;
  margin-top: 16px;
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
  h1Title,
  pDescription,
  divSearchBox,
  inputSearch,
  divFormList,
  divFormItem,
  h3ItemTitle,
  spanItemDate,
  divItemButtonWrapper,
  divSortWrapper,
  divSortList,
  inputRadio,
  labelRadio,
  spanCategoryText,
  divCategoryWrapper,
};
