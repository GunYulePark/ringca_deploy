import axios from "axios";
import { useEffect, useState } from "react";
import HeaderNoProfile from "../../components/Header/HeaderNoProfile";
import Toastify from "../../components/utils/Toast";
import { useForm } from "react-hook-form";

import "../../styles/suggestionPage.css";
import "react-toastify/dist/ReactToastify.css";

type FormValues = {
	senderUserId: any;
	senderUsername: any;
	contents: string;
};

function SuggestionPage() {
	const [senderUserRingcardName, setSenderUserRingcardName] =
		useState<string>();
	const [senderUserId, setSenderUserId] = useState<number>();
	const [senderUsername, setSenderUsername] = useState<string>();

	function setUserInfos() {
		const senderUserIdBox = document.getElementById("senderUserId");
		if (!!senderUserIdBox) {
			senderUserIdBox.innerText = String(senderUserId);
		}
		const senderUsernameBox = document.getElementById("senderUsername");
		if (!!senderUsernameBox) {
			senderUsernameBox.innerText = String(senderUsername);
		}
	}

	useEffect(() => {
		axios
			.get("/suggestion")
			.then((res) => {
				setSenderUserRingcardName(res.data.senderUserRingcardName);
				setSenderUserId(res.data.senderUserId);
				setSenderUsername(res.data.senderUsername);
			})
			.catch(function (error) {
				console.log(error.config);
			});

		setUserInfos();
	}, []);

	const onSubmit = async (data: any) => {
		await new Promise((r) => setTimeout(r, 100));
		await axios
			.post("/suggestion", data)
			.then((res) => {

				localStorage.setItem("toastShow", "1");
				localStorage.setItem(
					"toastText",
					"건의사항이 안전하게 전달되었습니다."
				);
				window.location.reload();
			})
			.catch(function (error) {
				console.log(error.config);
			});
	};

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
		var max_length = 50000;

		if (test_length > max_length) {
			alert(max_length + "자 이상 작성할 수 없습니다.");
			text = text.substr(0, max_length);
			event.target.value = text;
			event.target.focus();
		}
	}

	const {
		register,
		handleSubmit,
		setValue,
	} = useForm<FormValues>();

	return (
		<div className="container">
			<HeaderNoProfile />

			<div className="contents-container block">
				<div className="SuggestionPage-profile-box">
					<img src="/logo/Ringca_logo_background.png" alt="" />
					<div className="SuggestionPage-profile-username">링카 운영진</div>
				</div>

				<div className="SuggestionPage-SendQuestionForm-container">
					<div className="SuggestionPage-information">
						링카 운영진에게 건의할 사항이 있으시면 여기에 써서 보내주세요!
						<br />
						링카 운영진에게 전달됩니다!
					</div>
					<div className="SendQuestionFormUserHome-container">
						<Toastify />

						<form
							className="SendQuestionFormUserHome-question-form"
							onSubmit={handleSubmit(onSubmit)}
						>
							<input
								{...register("senderUserId")}
								id="senderUserId"
								style={{ display: "none" }}
							/>
							<input
								{...register("senderUsername")}
								id="senderUsername"
								style={{ display: "none" }}
								value={senderUserRingcardName}
							/>
							<div className="SendQuestionFormSuggestionpage-sender">
								발신인 : {senderUserRingcardName}
							</div>
							<div className="SendQuestionFormUserHome-questionForm-box">
								<div className="SendQuestionFormUserHome-questionForm-contents-box">
									<span className="SendQuestionFormSuggestionpage-cursur-bar">
										|
									</span>
									<textarea
										id="questionAdd"
										className="SendQuestionFormSuggestionpage-questionForm-textarea"
										value={checkItemContent}
										onInput={checkItemChangeHandler}
										onKeyUp={checkLengthHandler}
										{...register("contents")}
										style={{
											minHeight: "300px",
											height: (textareaHeight + 1) * 20 + "px",
										}}
										placeholder="건의사항을 써주세요"
									/>
								</div>
							</div>
							<hr className="SendQuestionFormSuggestionPage-hr" />
							<div className="SendQuestionFormSuggestionPage-footer">
								<button
									className="SendQuestionFormSuggestionPage-send-question-btn"
									type="submit"
									onClick={() => {
										setValue("senderUserId", senderUserId);
										setValue("senderUsername", senderUsername);
									}}
								>
									<img src="/buttons/send-question-btn.svg" alt="" />
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
}

export default SuggestionPage;
