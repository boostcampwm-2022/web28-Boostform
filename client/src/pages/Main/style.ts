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
  font-size: 20px;
  color: #5f6368;
  line-height: 28px;
  user-select: none;
`;

const ImageContainer = styled.div`
  width: 512px;
  margin-left: 36px;
  user-select: none;
`;

const Button = styled.button`
  background-color: #0066cc;
  font-weight: 400;
  color: #ffffff;
  font-size: 15px;
  padding: 8px 16px;
  border: none;
  font-size: 18px;
  border-radius: 2px;
  margin-top: 24px;
  cursor: pointer;
  user-select: none;
`;

const Image = styled.img`
  width: 100%;
  min-width: 400px;
  max-width: 600px;
`;

export { Container, TextContainer, ImageContainer, H1, Image, Button, Text };
