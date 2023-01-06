import axios from "axios";
import { useRef, useState } from "react";
import { useCookies } from "react-cookie";
import { useForm } from "react-hook-form";
import "../../styles/answerQuestionNote.css";
import html2canvas from "html2canvas";

export interface Props {
	questionId: number;
	questionContents: string;
}

function AnswerForm(props: Props) {
	const questionId = String(props.questionId);
	// 트위터 이미지로 전환할 질문 내용.
	const questionContents = props.questionContents;
	const [answerContents, setAnswerContents] = useState();

	const [cookies, setCookie, removeCookie] = useCookies(["accessToken"]);

	const onSubmit = async (data: any) => {
		await new Promise((r) => setTimeout(r, 100));

		// alert(JSON.stringify(data));
		console.log(data);
		// 섭밋할 때의 data.answerContents : 트위터에 텍스트로 들어갈 답변 내용.

		console.log(questionContents);

		await axios
			.post("/question/" + questionId + "/unanswered/user", data)
			.then(async (res) => {
				console.log("posthere");
				console.log(data.answerContents);
				setAnswerContents(data.answerContents);
				// window.location.href = "/question/" + questionId + "/completed/user";

				if (checked) {
					const tweetData = {
						text:
							"질문 : " +
							questionContents +
							"\n답변 : " +
							data.answerContents +
							" https://m.place.naver.com/restaurant/1720673456/home?entry=ple",
					};

					// const tweetDataTest = {
					// 					"text": "Testing, testing...\n\nA new way to have a convo with exactly who you want. We’re starting with a small % globally, so keep your 👀 out to see it in action. https://t.co/pV53mvjAVT",
					// 					"id": "1263145271946551300",
					// 					"attachments": {
					// 							"media_keys": [
					// 									"13_1263145212760805376"
					// 							]
					// 					}
					// 		};

					// const media =
					// 				{
					// 							"duration_ms": 46947,
					// 							"type": "video",
					// 							"height": 1080,
					// 							"media_key": "13_1263145212760805376",
					// 							"public_metrics": {
					// 									"view_count": 6909260
					// 							},
					// 							"preview_image_url": "https://pbs.twimg.com/media/EYeX7akWsAIP1_1.jpg",
					// 							"width": 1920
					// 					};

					await axios({
						method: "post",
						// url: 'https://ringca.herokuapp.com/https://api.twitter.com/2/tweets?expansions=attachments.media_keys&media.fields=duration_ms,height,media_key,preview_image_url,public_metrics,type,url,width,alt_text',

						url: "https://ringca.herokuapp.com/https://api.twitter.com/2/tweets",

						// url: 'https://upload.twitter.com/1.1/media/upload.json?media_category=tweet_image',

						data: tweetData,
						// media: media,
						headers: {
							Authorization: `Bearer ${cookies.accessToken.accessToken}`,
						},
					}).then((res) => {
						console.log(res);
						// alert("생성이 완료되었습니다.");
					});
				}
				window.location.href = "/question/" + questionId + "/completed/user";
			})
			.catch(function (error) {
				if (error.response) {
					// The request was made and the server responded with a status code
					// that falls out of the range of 2xx
					console.log(error.response.data);
					console.log(error.response.status);
					console.log(error.response.headers);
				} else if (error.request) {
					// The request was made but no response was received
					// `error.request` is an instance of XMLHttpRequest in the browser and an instance of
					// http.ClientRequest in node.js
					console.log(error.request);
				} else {
					// Something happened in setting up the request that triggered an Error
					console.log("Error", error.message);
				}
				console.log(error.config);
			});
	};

	// function BtnToCreateTweet(){
	// 	function handleClick(e: any){
	// 		console.log(cookies.accessToken);
	//     const data = {
	//       text: "질문 : " + questionContents + "\n 답변 :" + answerContents
	//     };

	//     axios({
	//       method: 'post',
	//       url: 'https://ringca.herokuapp.com/https://api.twitter.com/2/tweets',

	//       data: data,
	//       headers: {
	//         'Authorization': `Bearer ${cookies.accessToken.accessToken}`,
	//       }

	//     }).then((res) => {
	//       console.log(res);
	//       // alert("생성이 완료되었습니다.");
	//       });
	// 	}
	// 	return (
	// 		<button onClick={handleClick}>
	//       CreateTweet
	// 		</button>
	// 	);
	// }

	const {
		register,
		handleSubmit,
		// formState: { isSubmitting, isDirty, errors },
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

	// checkBox Start
	const [checked, setChecked] = useState(false);

	const checkHandler = (event: any) => {
		if (checked) {
			setChecked(false);
		} else if (checked === false) {
			setChecked(true);
		}
	};

	const CheckToSendTwitter = () => {
		return (
			<div>
				<input
					type="checkbox"
					checked={checked}
					onChange={(e) => checkHandler(e)}
				/>
			</div>
		);
	};
	// checkBox Fin.

	const printRef = useRef<HTMLInputElement>(null);
	// const printRef = useRef();

	const handleDownloadImage = async () => {
		const element: any = printRef.current;
		const canvas = await html2canvas(element);

		const data = canvas.toDataURL("image/jpg");
		const link = document.createElement("a");

		if (typeof link.download === "string") {
			link.href = data;
			link.download = "image.jpg";

			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);
		} else {
			window.open(data);
		}
	};

	return (
		<form className="answerForm-answer-form" onSubmit={handleSubmit(onSubmit)}>
			<div className="answerForm-text-box checkItem">
				<span className="cursur-bar">|</span>
				<textarea
					id="answerAdd"
					className="answerForm-textarea"
					value={checkItemContent}
					onInput={checkItemChangeHandler}
					onKeyUp={checkLengthHandler}
					style={{
						height: (textareaHeight + 1) * 27 + "px",
						whiteSpace: "pre-wrap",
					}}
					placeholder="답변을 적어주세요"
					{...register("answerContents", {
						required: "답변이 입력되지 않았습니다.",
					})}
				></textarea>
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
			<div>
				{/* <BtnToCreateTweet/> */}
				<p>Post Tweet?</p>
				<CheckToSendTwitter />
			</div>
		</form>
	);
}

export default AnswerForm;
