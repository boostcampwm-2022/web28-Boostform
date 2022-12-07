import styled from "styled-components";

const HeaderContainer = styled.div`
  margin-top: 24px;
`;

const Header = styled.ul`
  display: flex;
  align-items: center;
  justify-content: space-around;

  padding: 20px;
  margin-top: 20px;
  margin-bottom: 20px;

  border-radius: 3px;
  background-color: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.grey3};

  font-size: 14px;
`;

const NewFormText = styled.span`
  margin-left: 4px;
`;

const Title = styled.li`
  text-align: center;
  width: 30%;
`;
const Status = styled.li`
  text-align: center;
  width: 10%;
`;
const ResponseCount = styled.li`
  text-align: center;
  width: 10%;
`;
const Date = styled.li`
  text-align: center;
  width: 20%;
`;
const Share = styled.li`
  text-align: center;
  width: 10%;
`;
const Category = styled.li`
  text-align: center;
  width: 15%;
`;
const More = styled.li`
  position: relative;
  text-align: center;
  width: 10%;
`;

export { HeaderContainer, Header, NewFormText, Title, Status, ResponseCount, Date, Share, Category, More };
