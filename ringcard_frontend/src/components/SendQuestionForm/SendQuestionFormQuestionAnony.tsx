import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import "../../styles/sendQuestionFormQuestionAnony.css";
import SelectNoteModal from "../Modal/SelectNoteModal";
import SelectTapeModal from "../Modal/SelectTapeModal";
import Toastify from "../utils/Toast";

function SendQuestionFormQuestionAnony() {
	const params = useParams();
	const paramsQuestionId = params.questionId;

	const onSubmit = async (data: any) => {
		await new Promise((r) => setTimeout(r, 100));

		await axios
			.post("/question/" + paramsQuestionId + "/anony/", data)
			.then((res) => {
				localStorage.setItem("toastShow", "1");
				localStorage.setItem("toastText", "질문이 안전하게 전달되었습니다.");
				window.location.reload();
			})
			.catch(function (error) {
				console.log(error.config);
			});
	};

	const {
		register,
		handleSubmit,
		setValue,
	} = useForm();

	// 유저 입력 값을 넣을 변수
	const [checkItemContent, setCheckItemContent] = useState("");
	// 줄 수를 계산해서 저장할 변수
	const [textareaHeight, setTextareaHeight] = useState(0);

	// 사용자 입력 값이 변경될 때마다 checkItemContent에 저장하고
	// 엔터('\n') 개수를 세서 textareaHeight에 저장
	const checkItemChangeHandler = (event: any) => {
		setTextareaHeight(event.target.value.split("\n").length - 1);
		setCheckItemContent(event.target.value);
	};

	function checkLengthHandler(event: any) {
		var text = event.target.value;
		var test_length = text.length;

		//최대 글자수
		var max_length = 5000;

		if (test_length > max_length) {
			alert(max_length + "자 이상 작성할 수 없습니다.");
			text = text.substr(0, max_length);
			event.target.value = text;
			event.target.focus();
		}
	}

	// SelectNote모달창 노출 여부 state
	const [showSelectNoteModalReq, setShowSelectNoteModalReq] =
		useState<boolean>(false);

	function openShowSelectNoteModalReq() {
		setShowSelectNoteModalReq(!showSelectNoteModalReq);
	}
	function closeShowSelectNoteModalReq() {
		setShowSelectNoteModalReq(!showSelectNoteModalReq);
	}
	// SelectTape모달창 노출 여부 state
	const [showSelectTapeModalReq, setShowSelectTapeModalReq] =
		useState<boolean>(false);

	function openShowSelectTapeModalReq() {
		setShowSelectTapeModalReq(!showSelectTapeModalReq);
	}
	function closeShowSelectTapeModalReq() {
		setShowSelectTapeModalReq(!showSelectTapeModalReq);
	}

	const [noteColorData, setNoteColorData] = useState<any>(0);
	const getNoteColorData = (propsNoteColorData: any) => {
		setNoteColorData(propsNoteColorData);
	};

	const NoteColorIdxDict: any = {};
	NoteColorIdxDict["연보라"] = 1;
	NoteColorIdxDict["복숭아"] = 2;
	NoteColorIdxDict["파랑"] = 3;
	NoteColorIdxDict["노랑"] = 4;

	const [tapeColorData, setTapeColorData] = useState<any>(0);
	const getTapeColorData = (propsTapeColorData: any) => {
		setTapeColorData(propsTapeColorData);
	};

	const TapeColorIdxDict: any = {};
	TapeColorIdxDict["하늘"] = 1;
	TapeColorIdxDict["청록"] = 2;
	TapeColorIdxDict["분홍"] = 3;
	TapeColorIdxDict["보라"] = 4;
	TapeColorIdxDict["노랑"] = 5;

	useEffect(() => {
		const noteColorText = document.getElementById(
			"SendQuestionFormQuestionAnony-note-color-text"
		);
		const noteColorCode = document.getElementById(
			"SendQuestionFormQuestionAnony-note-color-code"
		);
		if (!!noteColorText) {
			if (noteColorData.colorName !== undefined) {
				noteColorText.innerText = noteColorData.colorName;
			} else {
				noteColorText.innerText = "랜덤색";
			}
		}
		if (!!noteColorCode) {
			if (noteColorData.colorCode !== undefined) {
				noteColorCode.style.backgroundColor = noteColorData.colorCode;
			} else {
				noteColorCode.style.backgroundColor = "#e9e1ec";
			}
		}
		const tapeColorText = document.getElementById(
			"SendQuestionFormQuestionAnony-tape-color-text"
		);
		const tapeColorCode = document.getElementById(
			"SendQuestionFormQuestionAnony-tape-color-code"
		);

		if (!!tapeColorText) {
			if (tapeColorData.colorName !== undefined) {
				tapeColorText.innerText = tapeColorData.colorName;
			} else {
				tapeColorText.innerText = "랜덤색";
			}
		}
		if (!!tapeColorCode) {
			if (tapeColorData.colorCode !== undefined) {
				tapeColorCode.style.backgroundColor = tapeColorData.colorCode;
			} else {
				tapeColorCode.style.backgroundColor = "#64B9DD";
			}
		}
	}, [noteColorData, tapeColorData]);

	return (
		<div className="SendQuestionFormQuestionAnony-container">
			<Toastify />
			<form
				className="SendQuestionFormQuestionAnony-question-form"
				onSubmit={handleSubmit(onSubmit)}
			>
				<div className="SendQuestionFormQuestionAnony-questionForm-box">
					<div className="SendQuestionFormQuestionAnony-questionForm-contents-box">
						<span className="SendQuestionFormQuestionAnony-cursur-bar">|</span>
						<textarea
							id="questionAdd"
							className="questionForm-textarea"
							value={checkItemContent}
							onInput={checkItemChangeHandler}
							onKeyUp={checkLengthHandler}
							style={{ height: (textareaHeight + 1) * 20 + "px" }}
							placeholder="질문해 주세요"
							{...register("questionContents", {
								required: "답변이 입력되지 않았습니다.",
							})}
						/>
					</div>
				</div>
				<div className="SendQuestionFormQuestionAnony-customize-area-box">
					<div
						className="SendQuestionFormQuestionAnony-customize-area"
						onClick={openShowSelectTapeModalReq}
						style={{ marginRight: "5px" }}
					>
						<SelectTapeModal
							getTapeColorData={getTapeColorData}
							open={showSelectTapeModalReq}
							close={closeShowSelectTapeModalReq}
						/>
						<div className="SendQuestionFormQuestionAnony-customize-box">
							<div
								className="SendQuestionFormQuestionAnony-note-color"
								id="SendQuestionFormQuestionAnony-tape-color-code"
								style={{ backgroundColor: "#e9e1ec" }}
							/>
							<div
								className="SendQuestionFormQuestionAnony-note-color-text"
								id="SendQuestionFormQuestionAnony-tape-color-text"
							>
								보라
							</div>
							<img
								className="SendQuestionFormQuestionAnony-open-modal-btn"
								src="/buttons/chevron-note-select-btn.svg"
								alt=""
							/>
						</div>
					</div>
					<div
						className="SendQuestionFormQuestionAnony-customize-area"
						onClick={openShowSelectNoteModalReq}
					>
						<SelectNoteModal
							getNoteColorData={getNoteColorData}
							open={showSelectNoteModalReq}
							close={closeShowSelectNoteModalReq}
						/>
						<div className="SendQuestionFormQuestionAnony-customize-box">
							<div
								className="SendQuestionFormQuestionAnony-note-color"
								id="SendQuestionFormQuestionAnony-note-color-code"
								style={{ backgroundColor: "#e9e1ec" }}
							/>
							<div
								className="SendQuestionFormQuestionAnony-note-color-text"
								id="SendQuestionFormQuestionAnony-note-color-text"
							>
								{/* {noteColorData.colorName} */}
								연보라
							</div>
							<img
								className="SendQuestionFormQuestionAnony-open-modal-btn"
								src="/buttons/chevron-note-select-btn.svg"
								alt=""
							/>
							<input {...register("noteType")} style={{ display: "none" }} />
							<input {...register("tapeType")} style={{ display: "none" }} />
						</div>
					</div>
				</div>

				<hr className="SendQuestionFormQuestionAnony-hr" />
				<div className="SendQuestionFormQuestionAnony-footer">
					<img
						className="SendQuestionFormQuestionAnony-hyperlink-btn"
						src="/buttons/link-icn.svg"
						alt=""
					/>
					<input
						id="hyperLinkAdd"
						className="QuestionForm-hyperlink-input"
						placeholder="첨부할 사이트 주소를 넣어주세요 (최대 1개)"
						onKeyUp={checkLengthHandler}
						{...register("questionHyperlink")}
					/>
					<button
						className="SendQuestionFormQuestionAnony-send-question-btn"
						type="submit"
						onClick={() => {
							setValue("noteType", NoteColorIdxDict[noteColorData.colorName]);
							setValue("tapeType", TapeColorIdxDict[tapeColorData.colorName]);
						}}
					>
						<img src="/buttons/send-question-btn.svg" alt="" />
					</button>
				</div>
			</form>
		</div>
	);
}

export default SendQuestionFormQuestionAnony;
