import React from "react";
import styled from "styled-components";
import Icon from "../../components/Icon/Icon.component";

const Container = styled.section`
	padding: 20px;
	min-width: 1024px;
`;

const HeaderContainer = styled.div``;

const Header = styled.ul`
	display: flex;
	align-items: center;
	justify-content: space-around;

	padding: 20px;
	margin-bottom: 20px;

	border-radius: 9px;
	background-color: #ffffff;
	border: 1px solid #afafaf;

	font-size: 14px;
`;

const ListContainer = styled.div`
	background-color: #ffffff;
	border: 1px solid #afafaf;
	border-radius: 9px;
	overflow: hidden;
`;

const List = styled.ul`
	display: flex;
	align-items: center;
	justify-content: space-around;

	background-color: #ffffff;
	padding: 20px 20px;
	font-size: 14px;

	&:hover {
		background-color: #eaeaea;
		cursor: pointer;
	}
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
	text-align: center;
	width: 10%;
`;

const ButtonContainer = styled.div`
	display: flex;
	justify-content: center;
	padding: 10px;
`;

const Button = styled.button`
	border: 0;
	background-color: transparent;
	cursor: pointer;

	&:active {
		transform: translateY(1px);
	}
`;

function Manage() {
	return (
		<Container>
			<HeaderContainer>
				<Header>
					<Title>제목</Title>
					<Status>상태</Status>
					<ResponseCount>응답수</ResponseCount>
					<Date>수정 날짜</Date>
					<Share>게시판 공유</Share>
					<Category>카테고리</Category>
					<More>더보기</More>
				</Header>
			</HeaderContainer>
			<ListContainer>
				<List>
					<Title>short title</Title>
					<Status>Close</Status>
					<ResponseCount>10</ResponseCount>
					<Date>2022/11/08 16:34</Date>
					<Share>on</Share>
					<Category>예시1</Category>
					<More>
						<Button>
							<Icon type="kebab" size="16px" />
						</Button>
					</More>
				</List>
				<List>
					<Title>short title</Title>
					<Status>Close</Status>
					<ResponseCount>10</ResponseCount>
					<Date>2022/11/08 16:34</Date>
					<Share>on</Share>
					<Category>예시1</Category>
					<More>
						<Button>
							<Icon type="kebab" size="16px" />
						</Button>
					</More>
				</List>
				<ButtonContainer>
					<Button type="button">
						<Icon type="plus" size="24px" />
					</Button>
				</ButtonContainer>
			</ListContainer>
		</Container>
	);
}

export default Manage;
