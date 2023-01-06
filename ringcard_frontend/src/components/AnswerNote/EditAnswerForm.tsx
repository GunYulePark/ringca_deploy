import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import "../../styles/answerQuestionNote.css";
import TextareaAutosize from "react-textarea-autosize";

export interface Props {
	questionId: number;
	oldAnswer: String;
}

function AnswerForm(props: Props) {
	const questionId = String(props.questionId);
	const PropsOldAnswer = String(props.oldAnswer);
	const [oldAnswer, setOldAnswer] = useState<any>();
	useEffect(() => {
		setOldAnswer(PropsOldAnswer);
	}, [PropsOldAnswer]);

	const onSubmit = async (data: any) => {
		await new Promise((r) => setTimeout(r, 100));
		await axios
			.post("/question/" + questionId + "/edit/user", data)
			.then((res) => {
				window.location.replace("/question/" + questionId + "/completed/user");
			})
			.catch(function (error) {
				console.log(error.config);
			});
	};

	const {
		register,
		handleSubmit,
	} = useForm();

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

	return (
		<form className="answerForm-answer-form" onSubmit={handleSubmit(onSubmit)}>
			<div className="answerForm-text-box checkItem">
				<span className="cursur-bar">|</span>
				<TextareaAutosize
					id="answerAdd"
					className="answerForm-textarea"
					defaultValue={oldAnswer}
					onKeyUp={checkLengthHandler}
					rows={5}
					maxRows={10}
					{...register("answerContents", {
						required: "답변이 입력되지 않았습니다.",
					})}
				/>
			</div>
			<div className="answerForm-btn-box">
				<button type="submit">
					<img
						className="note-send-answer-btn"
						src="/buttons/send-answer-btn.svg"
						alt=""
					/>
				</button>
			</div>
		</form>
	);
}

export default AnswerForm;
