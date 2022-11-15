import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";

const Container = styled.div`
	position: absolute;
	top: 35%;
	left: 50%;
	transform: translate(-50%, -50%);

	width: 400px;
	border-radius: 9px;
	padding: 20px;

	z-index: 2;
	background-color: white;
`;

function EditNameModal({ closeModal, formID }: { closeModal: () => void; formID: string }) {
	const [name, setName] = useState("");

	const onClickChangeName = async () => {
		await axios.patch(`http://localhost:8080/api/forms/${formID}`, {
			title: name,
		});
		closeModal();
	};
	const onClickCancelChangeName = () => closeModal();

	const onInputChangeName: React.ChangeEventHandler<HTMLInputElement> = (e) => {
		setName(e.target.value);
	};

	return (
		<Container>
			<div>이름 바꾸기</div>
			<div>항목의 새 이름을 입력하세요</div>
			<input onInput={onInputChangeName} />
			<div>
				<button type="button" onClick={onClickChangeName}>
					확인
				</button>
				<button type="button" onClick={onClickCancelChangeName}>
					취소
				</button>
			</div>
		</Container>
	);
}

export default EditNameModal;
