import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import "../../styles/layout/layout.css";
import "../../styles/layout/header.css";
import "../../styles/user/userBox.css";
import "../../styles/user/userIcon.css";
import "../../styles/user/userHeader.css";
import "../../styles/join.css";

import HeaderRingcaShort from "../../components/Header/HeaderRingcaShort";

type FormValues = {
	userRingcardName: string;
	username: string;
	password: string;
	userEmail: string;
	emailAlert: string;
};

const Join = () => {
	type ResponseList = {
		bindingResultHasErrors: boolean;
		overlappedUsername: boolean;
	};
	const [response, setResponse] = useState<ResponseList>({
		bindingResultHasErrors: false,
		overlappedUsername: false,
	});
	const [submitted, setSubmitted] = useState(false);

	useEffect(() => {
		axios
			.get("/joinForm")
			.then((res) => {
				console.log(res);
			})
			.catch((err) => {
				console.log(err);
			});
	});

	const onSubmit = async (data: any) => {
		await new Promise((r) => setTimeout(r, 100));

		console.log(data);
		await axios
			.post("/joinForm", data)
			.then((res) => {
				setResponse(res.data);
				setSubmitted(true);
			})
			.catch(function (error) {
				console.log(error.config);
			});
	};

	function RedirectAndInputErrors() {
		if (response.bindingResultHasErrors && response.overlappedUsername) {
			return (
				<>
					<div className="user-text-error">
						올바르지 않은 형식이 포함되어있습니다.
					</div>
					<div className="user-text-error">이미 존재하는 아이디입니다.</div>
				</>
			);
		} else if (response.bindingResultHasErrors) {
			return (
				<div className="user-text-error">
					올바르지 않은 형식이 포함되어있습니다.
				</div>
			);
		} else if (response.overlappedUsername) {
			return <div className="user-text-error">이미 존재하는 아이디입니다.</div>;
		} else if (submitted) {
			window.location.href = "/loginForm";
			return null;
		}
		return null;
	}

	// PW toggle start.
	const [showPw, setShowPw] = useState<boolean>(false);
	const toggleShowPw = () => {
		setShowPw(!showPw);
	};

	function handlePwClick(e: any) {
		toggleShowPw();
	}

	function ShowPw(props: any) {
		return (
			<button
				value="변경"
				className="user-show-pw"
				onClick={handlePwClick}
			></button>
		);
	}

	function HidePw(props: any) {
		return (
			<button
				value="변경"
				className="user-hide-pw"
				onClick={handlePwClick}
			></button>
		);
	}
	// PW toggle fin.

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormValues>({ mode: "onChange" });

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div className="container">
				<HeaderRingcaShort />
				<div className="user-box">
					<div className="user-box-in">
						<div className="user-text">링카이름</div>
						<div className="user-box-div-light user-icon-user-light">
							<span className="user-icon-bar">|</span>
							<input
								className="user-inner-transparent"
								placeholder="링카에서 쓸 닉네임을 입력해주세요."
								{...register("userRingcardName", {
									required: "링카이름은 필수 입력입니다.",
									maxLength: {
										value: 16,
										message: "최대 16자 이하의 이름을 입력해주세요.",
									},
								})}
							></input>
						</div>
						<div className="Join-input-error-message">
							{errors?.userRingcardName && (
								<p>{errors.userRingcardName.message}</p>
							)}
						</div>
					</div>
					<div className="user-box-in">
						<div className="user-text">아이디</div>
						<div className="user-box-div-light user-icon-id-light">
							<span className="user-icon-bar">|</span>
							<input
								className="user-inner-transparent"
								placeholder="아이디는 변경이 불가능합니다."
								{...register("username", {
									required: "아이디는 필수 입력입니다.",
									pattern: {
										// input의 정규식 패턴
										value: /^[A-za-z0-9가-힣]{3,10}$/,
										message: "가능한 문자: 영문 대소문자, 한글, 숫자", // 에러 메세지
									},
									minLength: {
										value: 4,
										message: "최소 4자 이상의 아이디를 입력해주세요.",
									},
									maxLength: {
										value: 16,
										message: "최대 16자 이하의 아이디를 입력해주세요.",
									},
								})}
							></input>
						</div>
						<div className="Join-input-error-message">
							{errors?.username && <p>{errors.username.message}</p>}
						</div>
					</div>
					<div className="user-box-in">
						<div className="user-text">비밀번호</div>
						<div className="user-box-div user-icon-light">
							<span className="user-icon-bar">|</span>
							<input
								type={showPw ? "text" : "password"}
								className="user-inner-transparent"
								placeholder="오른쪽 자물쇠를 클릭하면 확인 가능합니다."
								{...register("password", {
									required: "비밀번호는 필수 입력입니다.",
									pattern: {
										value: /^[A-za-z0-9@$!%*#?&]*$/,
										message:
											"가능한 문자: 영문 대소문자, 숫자, 특수문자 @$!%*#?&",
									},
									minLength: {
										value: 8,
										message: "최소 8자 이상의 비밀번호를 입력해주세요.",
									},
								})}
							></input>
							{showPw ? (
								<ShowPw onClick={toggleShowPw} />
							) : (
								<HidePw onClick={toggleShowPw} />
							)}
						</div>
						<div className="Join-input-error-message">
							{errors?.password && <p>{errors.password.message}</p>}
						</div>
					</div>

					<div className="user-box-in">
						<div className="user-text">이메일</div>
						<div className="user-box-div-light user-icon-email-light">
							<span className="user-icon-bar">|</span>
							<input
								className="user-inner-transparent"
								type="email"
								placeholder="이메일은 비밀번호 찾을 때 사용됩니다."
								{...register("userEmail", {
									required: "이메일은 필수입력입니다.",
									pattern: {
										value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
										message: "이메일 형식이 아닙니다.",
									},
								})}
							></input>
						</div>
						<div className="Join-input-error-message">
							{errors?.userEmail && <p>{errors.userEmail.message}</p>}
						</div>
					</div>

					<div className="user-box-in">
						<label>
							<input type="checkbox" {...register("emailAlert")} checked />
							이메일로 새 질문 알림을 받겠습니다. (추후 변경 가능)
						</label>
					</div>
				</div>

				<div className="user-box-in">
					<RedirectAndInputErrors />
					<button type="submit" className="user-btn join-btn">
						<div className="user-btn-text">회원가입</div>
					</button>
				</div>
			</div>
		</form>
	);
};

export default Join;
