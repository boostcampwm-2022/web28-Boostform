import styled, { css } from "styled-components";

const Container = styled.div<{ scroll: boolean }>`
  ${({ scroll }) =>
    scroll &&
    css`
      max-height: 340px;
      overflow-y: scroll;
    `}
`;

const ListElement = styled.div`
  background-color: ${({ theme }) => theme.colors.grey0};
  margin-top: 4px;
  font-size: 14px;
  font-weight: 400;
  padding: 10px;
  border-radius: 3px;
`;

export { Container, ListElement };
