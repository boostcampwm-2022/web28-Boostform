import styled from "styled-components";

const Layout = styled.div`
  min-width: 1024px;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;

  a {
    text-decoration: none;
    color: ${({ theme }) => theme.colors.black};

    &:active {
      text-decoration: none;
    }
  }
`;

const HeaderContainer = styled.header`
  box-sizing: content-box;
  margin: 0 32px;
  padding: 10px 0;
  display: flex;
  background-color: white;
`;

const LinkButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: right;

  a {
    margin-right: 48px;
  }
`;

export { HeaderContainer, Layout, LinkButtonWrapper };
