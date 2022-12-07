import styled from "styled-components";

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

const spanItem = styled.span`
  font-size: 14px;
  color: #777;
`;

const divItemButtonWrapper = styled.div`
  display: flex;
  margin-top: 16px;
`;

export { divFormList, divFormItem, h3ItemTitle, spanItem, divItemButtonWrapper };
