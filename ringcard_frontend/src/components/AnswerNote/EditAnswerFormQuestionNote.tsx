import { IQuestion } from "../types";
import "../../styles/question.css";
import "../../styles/answerQuestionNote.css";
import EditAnswerForm from "./EditAnswerForm";
import NowDate from "../utils/NowDate";
import HyperlinkBox from "../atoms/HyperlinkBox";

export interface Props {
	question: IQuestion;
	oldAnswer: String;
}

function EditAnswerFormQuestionNote(props: Props) {
	const question = props.question;
	const oldAnswer = props.oldAnswer;

	const tapePositionList = [
		"width: 130px; height: 28px; margin: 0 auto; margin-top: -8px;",
		"width: 130px; height: 28px; margin: 0 auto 0 auto; margin-top: -2.5px; transform: rotate(6deg);",
		"width: 120px; height: 28px; transform: rotate(-30deg); margin: 7px auto -15px -13px;",
		"width: 130px; height: 28px; transform: rotate(-18deg); margin: 3px auto -30px -8px;",
		"width: 130px; height: 28px; transform: rotate(20deg); margin: 6px -9px -10px auto;",
		"width: 100px; height: 28px; transform: rotate(36deg); margin: 8px -11px -10px auto;",
	];
	const chosenPosition = tapePositionList[question.tapePosition - 1];

	const qIdStr = String(question.id);
	const tapeTypeStr = String(question.tapeType);
	const tapeUrl = String("/masking-tapes/tape" + tapeTypeStr + ".svg");

	const eachNote = document.getElementById(qIdStr);
	eachNote?.setAttribute("style", chosenPosition);

	const qNoteType = String(question.noteType);

	return (
		<>
			<div className="each-question-note-box">
				<div className="QuestionNote-maskingTape-box">
					<img
						className="QuestionNote-maskingTape-img"
						id={qIdStr}
						src={tapeUrl}
						alt=""
					/>
				</div>
				<div
					className="each-question-note-header-edge-img-box"
					style={{
						backgroundImage: `url("/notes/note${qNoteType}-top-edge.png")`,
					}}
				></div>
				<div
					className="each-question-note-body"
					style={{
						backgroundImage: `url("/notes/note${qNoteType}-body.png")`,
					}}
				>
					<div className="each-note-header">
						<div className="note-profile-pic">
							<img src="/test-anony-profile-pic.jpg" alt="" />
						</div>
						<NowDate questionUploadTime={question.uploadTime} />
					</div>
					<div className="each-note-content-box">
						<div className="each-note-content">{question.questionContents}</div>
					</div>
					{question.questionHyperlink == null ||
					question.questionHyperlink === "" ? undefined : (
						<div className="QuestionNote-note-hyperlink-box">
							<HyperlinkBox hyperlinkContent={question.questionHyperlink} />
						</div>
					)}

					<hr className="note-hr" />
					<div className="each-note-answer-form-box">
						<EditAnswerForm questionId={question.id} oldAnswer={oldAnswer} />
					</div>
				</div>
				<div
					className="each-question-note-footer-edge-img-box"
					style={{
						backgroundImage: `url("/notes/note${qNoteType}-bottom-edge.png")`,
					}}
				></div>
			</div>
		</>
	);
}

export default EditAnswerFormQuestionNote;
