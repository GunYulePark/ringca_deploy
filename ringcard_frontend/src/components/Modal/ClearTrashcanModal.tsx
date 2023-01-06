import axios from "axios";
import React, { ReactElement } from "react";
import "../../styles/clearTrashcanModal.css";

interface props {
	open: boolean;
	close: () => void; // 함수 타입 정의할 때
}

const ClearTrashcanModal = (props: props): ReactElement => {
	const { open, close } = props;

	const handleClearTrashcanClick = async () => {
		await axios
			.get("/home/trashcan/clearTrashcan")
			.then((res) => {
				window.history.go(0);
			})
			.catch(function (error) {
				console.log(error.config);
			});
	};

	return (
		<>
			<div className={open ? "bg" : ""} />
			<div className={open ? "modal active" : "modal"}>
				{open ? (
					<div className="ClearTrashcanModal-area">
						<div className="ClearTrashcanModal-container">
							휴지통에 있는 모든 질문들이
							<br />
							영구적으로 삭제됩니다.
							<br />
							삭제하시겠습니까?
						</div>
						<hr className="ClearTrashcanModal-hr" />
						<div className="ClearTrashcanModal-footer">
							<button className="ClearTrashcanModal-close-btn" onClick={close}>
								취소
							</button>
							<button
								className="ClearTrashcanModal-delete-btn"
								onClick={handleClearTrashcanClick}
							>
								휴지통 비우기
							</button>
						</div>
					</div>
				) : null}
			</div>
		</>
	);
};

export default ClearTrashcanModal;
