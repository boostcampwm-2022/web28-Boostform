import styled, { css } from "styled-components";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 40px;
`;

const PageNumberWrapper = styled.ul`
  margin: 10px 8px;
`;

const PageText = styled.li<{ current: boolean }>`
  display: inline-block;
  margin: 0 6px;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  text-align: center;
  font-size: 14px;
  font-weight: 500;
  line-height: 24px;
  cursor: pointer;

  ${({ current, theme }) =>
    current
      ? css`
          color: ${theme.colors.white};
          font-weight: 600;
          background-color: ${theme.colors.blue3};
        `
      : css``}
`;

export { Container, PageNumberWrapper, PageText };
