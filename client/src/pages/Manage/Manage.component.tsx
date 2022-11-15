import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import Icon from "components/Icon/Icon.component";

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
`;

const List = styled.ul`
	display: flex;
	align-items: center;
	justify-content: space-around;

	background-color: #ffffff;
	padding: 20px 20px;
	font-size: 14px;

	&:first-child {
		border-top-left-radius: 9px;
		border-top-right-radius: 9px;
	}

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
	position: relative;
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

const Dropdown = styled.ul`
	position: absolute;
	top: 40px;
	right: -10px;
	z-index: 1;
	background-color: white;
	padding: 10px 0;
	border-radius: 9px;
	border: 1px solid #afafaf;

	li {
		width: 180px;
		padding: 10px;
		text-align: left;
		cursor: pointer;

		&:hover {
			background-color: #eaeaea;
		}
	}
`;

interface ListProps {
	id: string;
	title: string;
	acceptResponse: boolean;
	response: number;
	createdAt: string;
	updatedAt: string;
	onBoard: boolean;
	category: string;
}

type ListArrayProps = ListProps[];

function Manage() {
	const [page, setPage] = useState(1);
	const [list, setList] = useState<ListArrayProps>([]);
	const [dropdownList, setDropdownList] = useState<boolean[]>([]);

	useEffect(() => {
		const source = axios.CancelToken.source();

		axios(`http://localhost:8080/api/forms/test/${page}`, { withCredentials: true, cancelToken: source.token })
			.then((response) => {
				setList((prev) => [...prev, ...response.data.form]);

				const falseArray = new Array(response.data.form.length).fill(false);
				setDropdownList((prev) => [...prev, ...falseArray]);
			})
			.catch((e) => {
				// eslint-disable-next-line no-console
				if (e.message !== "cleanup") console.log(e);
			});

		return () => source.cancel("cleanup");
	}, [page]);

	const onClickAddList: React.MouseEventHandler<HTMLButtonElement> = () => {
		setPage((prev) => prev + 1);
	};

	const onClickOpenDropdown = (index: number) => {
		setDropdownList((prev) => {
			const value = prev[index];
			const { length } = prev;

			const curr = Array(length).fill(false);

			curr[index] = !value;
			return curr;
		});
	};

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
				<>
					{list.map(({ category, id, onBoard, response, title, updatedAt, acceptResponse }, index) => (
						<List key={id}>
							<Title key={`${id}Title`}>{title}</Title>
							<Status key={`${id}AcceptResponse`}>{acceptResponse ? "Open" : "Close"}</Status>
							<ResponseCount key={`${id}Response`}>{response}</ResponseCount>
							<Date key={`${id}UpdatedAt`}>{updatedAt}</Date>
							<Share key={`${id}onBoard`}>{onBoard ? "On" : "Off"}</Share>
							<Category key={`${id}Category`}>{category}</Category>
							<More key={`${id}More`}>
								<Button type="button" onClick={() => onClickOpenDropdown(index)}>
									<Icon type="kebab" size="16px" />
								</Button>
								{dropdownList[index] ? (
									<Dropdown>
										<li>이름 바꾸기</li>
										<li>삭제</li>
									</Dropdown>
								) : (
									""
								)}
							</More>
						</List>
					))}
				</>
				<ButtonContainer>
					<Button type="button" onClick={onClickAddList}>
						<Icon type="plus" size="24px" />
					</Button>
				</ButtonContainer>
			</ListContainer>
		</Container>
	);
}

export default Manage;
