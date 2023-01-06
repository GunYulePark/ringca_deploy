import React, { ReactElement, useEffect, useState } from "react";
import "../../styles/selectTapeModal.css";
import { colorDataType } from "../types";

interface props {
	open: boolean;
	close: () => void; // 함수 타입 정의할 때
	getTapeColorData: (tapeColorName: any) => void;
}

const SelectTapeModal = (props: props): ReactElement => {
	const { open, close, getTapeColorData } = props;
	const [TapeColorName, setTapeColorName] = useState<"하늘">();
	const [TapeColorCode, setTapeColorCode] = useState<"#64B9DD">();

	const TapeColorDict: any = {};
	TapeColorDict["하늘"] = "#64B9DD";
	TapeColorDict["청록"] = "#4BACAC";
	TapeColorDict["분홍"] = "#E7B0C8";
	TapeColorDict["보라"] = "#BDACD4";
	TapeColorDict["노랑"] = "#F6DB61";

	function handleTapeColorClick(event: any): void {
		setTapeColorName(event.target.textContent);
		setTapeColorCode(TapeColorDict[event.target.textContent]);
	}

	useEffect(() => {
		const tapeColorData: colorDataType = {
			colorName: TapeColorName,
			colorCode: TapeColorCode,
		};

		getTapeColorData(tapeColorData);
	}, [TapeColorName, TapeColorCode]);

	return (
		<>
			<div className={open ? "bg" : ""} />
			<div className={open ? "modal active" : "modal"}>
				{open ? (
					<div className="SelectTapeModal-area">
						<div className="SelectTapeModal-header">
							<div className="SelectTapeModal-header-text">테이프 색상</div>
							<div className="SelectTapeModal-selected-box">
								<div
									className="SendQuestionForm-note-color"
									style={{ backgroundColor: `${TapeColorCode}` }}
								/>
								<div className="SendQuestionForm-note-color-text">
									{TapeColorName}
								</div>
								<img
									className="SendQuestionForm-open-modal-btn"
									src="/buttons/chevron-note-select-btn.svg"
									alt=""
								/>
							</div>
						</div>

						<div className="SelectTapeModal-hr-box">
							<hr className="SelectTapeModal-hr" />
						</div>
						<div className="SelectTapemodal-colors-box">
							<div
								className="SelectTapemodal-color-option"
								style={{ backgroundColor: "#64B9DD" }}
								onClick={handleTapeColorClick}
							>
								<div>하늘</div>
							</div>
							<div
								className="SelectTapemodal-color-option"
								style={{ backgroundColor: "#4BACAC" }}
								onClick={handleTapeColorClick}
							>
								<div>청록</div>
							</div>
							<div
								className="SelectTapemodal-color-option"
								style={{ backgroundColor: "#E7B0C8" }}
								onClick={handleTapeColorClick}
							>
								<div>분홍</div>
							</div>
							<div
								className="SelectTapemodal-color-option"
								style={{ backgroundColor: "#BDACD4" }}
								onClick={handleTapeColorClick}
							>
								<div>보라</div>
							</div>
							<div
								className="SelectTapemodal-color-option"
								style={{ backgroundColor: "#F6DB61" }}
								onClick={handleTapeColorClick}
							>
								<div>노랑</div>
							</div>

							{/* 여기다가 계속 색 추가하면 됨 */}
						</div>
					</div>
				) : null}
			</div>
		</>
	);
};
export default SelectTapeModal;
