import styled from "styled-components";

const Container = styled.section`
  display: flex;
  justify-content: space-between;
  margin-top: 64px;
  min-width: 1024px;
`;

const TextContainer = styled.div`
  width: 512px;
  margin-left: auto;
`;

const H1 = styled.h1`
  font-size: 60px;
  margin-right: auto;
  user-select: none;
  max-width: 600px;
  line-height: 72px;
`;

const Text = styled.p`
  margin-top: 36px;
  margin-bottom: 24px;
  font-size: 20px;
  color: ${({ theme }) => theme.colors.grey5};
  line-height: 28px;
  user-select: none;
`;

const ImageContainer = styled.div`
  width: 512px;
  margin-left: 36px;
  user-select: none;
`;

const Image = styled.img`
  width: 100%;
  min-width: 400px;
  max-width: 600px;
`;

export { Container, TextContainer, ImageContainer, H1, Image, Text };
