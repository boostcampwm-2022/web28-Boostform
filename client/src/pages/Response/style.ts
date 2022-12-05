import styled from "styled-components";

const Container = styled.div`
  width: 760px;
`;

const HeadContainer = styled.div`
  margin-top: 12px;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 3px;
  padding: 10px 20px;
`;

const Title = styled.div`
  width: 100%;
  display: block;
  font-size: 32px;
  padding: 5px 0;
  border: none;
  font-family: Arial, Helvetica, sans-serif;
  line-height: 48px;
`;

const Description = styled.p`
  padding-top: 8px;
  font-size: 14px;
  font-weight: 400;
`;

const LinkWrapper = styled.div`
  margin-top: 24px;
  margin-bottom: 18px;
  display: flex;
  flex-direction: column;
`;

const Link = styled.a`
  padding-top: 5px;
  font-size: 14px;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.blue4};
  text-decoration: underline;
  cursor: pointer;
`;

export { Container, HeadContainer, Title, Description, LinkWrapper, Link };
