import React from "react";
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

function DeleteSurveyModal({
	closeModal,
	modifyListBySurveyDelete,
	selectedSurvey,
}: {
	closeModal: () => void;
	selectedSurvey: { id: string; index: number };
	modifyListBySurveyDelete: (index: number) => void;
}) {
	console.log(selectedSurvey);
	const onClickDeleteSurvey = async () => {
		await axios.delete(`http://localhost:8080/api/forms/${selectedSurvey.id}`);
		modifyListBySurveyDelete(selectedSurvey.index);
		closeModal();
	};

	const onClickCancelDelete = () => closeModal();

	return (
		<Container>
			<div>삭제하시겠습니까?</div>
			<div>
				<button type="button" onClick={onClickDeleteSurvey}>
					확인
				</button>
				<button type="button" onClick={onClickCancelDelete}>
					취소
				</button>
			</div>
		</Container>
	);
}

export default DeleteSurveyModal;
