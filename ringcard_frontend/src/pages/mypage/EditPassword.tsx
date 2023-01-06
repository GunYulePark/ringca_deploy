import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../styles/layout/layout.css";
import "../../styles/layout/header.css";
import "../../styles/user/userBox.css";
import "../../styles/user/userIcon.css";
import "../../styles/user/userHeader.css";
import "../../styles/editPassword.css";
import HeaderNoProfile from "../../components/Header/HeaderNoProfile";
import { useForm } from "react-hook-form";
import UserProfile from "../../components/atoms/UserProfile";
import { Link } from "react-router-dom";

type FormValues = {
	pastPassword: string;
	newPassword: string;
	newPasswordConfirm: string;
};

const EditPassword = () => {
	type ResponseList = {
		pastPasswordFalse: boolean;
		passwordSame: boolean;
		newPasswordFalse: boolean;
		passwordChanged: boolean;
	};
	const [response, setResponse] = useState<ResponseList>({
		pastPasswordFalse: false,
		passwordSame: false,
		newPasswordFalse: false,
		passwordChanged: false,
	});

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

	const [submitted, setSubmitted] = useState(false);

	const [user, setUser] = useState<any>([]);
	useEffect(() => {
		axios
			.get("/mypage/info")
			.then((res) => {
				setUser(res.data);
			})
			.catch(function (error) {
				console.log(error.config);
			});
	}, []);

	const onSubmit = async (data: any) => {
		await new Promise((r) => setTimeout(r, 100));

		await axios
			.post("/mypage/edit/password", data)
			.then((res) => {
				setResponse(res.data);
				setSubmitted(true);
			})
			.catch(function (error) {
				console.log(error.config);
			});
	};

	function RedirectAndInputErrors() {
		// if(response.pastPasswordBlank){
		// 	return <div className="user-text-error">pastPasswordBlank</div>
		// }
		if (response.pastPasswordFalse) {
			return (
				<div className="user-text-error">
					현재 비밀번호를 정확히 입력해 주세요.
				</div>
			);
		}
		// else if(response.newPasswordBlank){
		// 	return <div className="user-text-error">newPasswordBlank</div>
		// }
		else if (response.passwordSame) {
			return (
				<div className="user-text-error">
					새 비밀번호를 현재 비밀번호와 다르게 변경해 주세요.
				</div>
			);
		} else if (response.newPasswordFalse) {
			return (
				<div className="user-text-error">
					새 비밀번호와 비밀번호 확인이 일치하지 않습니다.
				</div>
			);
		} else if (response.passwordChanged && submitted) {
			// 위 조건 만족할 때만 loginForm으로 새로고침
			localStorage.setItem("toastShow", "1");
			localStorage.setItem("toastText", "비밀번호가 변경되었습니다.");
			window.location.href = "/mypage/info";
			return null;
		}
		return null;
	}

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormValues>({ mode: "onSubmit" });

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div className="container">
				<HeaderNoProfile />
				<div className="userInfo-profile-container">
					<UserProfile />
					<div className="user-profile-name">{user.userRingcardName}</div>
				</div>

				<div>
					<div className="user-box">
						<div className="user-box-in">
							<div className="user-text">현재 비밀번호</div>
							<div className="user-box-div user-icon-light">
								<input
									type={showPw ? "text" : "password"}
									className="user-inner-transparent"
									placeholder="현재 비밀번호를 입력해주세요."
									{...register("pastPassword", {
										required: "답변이 입력되지 않았습니다.",
									})}
								></input>
								{showPw ? (
									<ShowPw onClick={toggleShowPw} />
								) : (
									<HidePw onClick={toggleShowPw} />
								)}
							</div>
							<div className="Join-input-error-message">
								{errors?.pastPassword && <p>{errors.pastPassword.message}</p>}
							</div>
						</div>

						<div className="user-box-in">
							<div className="user-text">새 비밀번호</div>
							<div className="user-box-div user-icon-light">
								<input
									type={showPw ? "text" : "password"}
									className="user-inner-transparent"
									placeholder="새 비밀번호를 입력해주세요."
									{...register("newPassword", {
										required: "답변이 입력되지 않았습니다.",
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
								{errors?.newPassword && <p>{errors.newPassword.message}</p>}
							</div>
						</div>

						<div className="user-box-in">
							<div className="user-text">새 비밀번호 확인</div>
							<div className="user-box-div user-icon-light">
								<input
									type={showPw ? "text" : "password"}
									className="user-inner-transparent"
									placeholder="새 비밀번호를 다시 한 번 입력해주세요."
									{...register("newPasswordConfirm", {
										required: "답변이 입력되지 않았습니다.",
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
								{errors?.newPasswordConfirm && (
									<p>{errors.newPasswordConfirm.message}</p>
								)}
							</div>
						</div>

						<div className="user-box-in">
							<RedirectAndInputErrors />
						</div>

						<div className="user-box-in flex-spacebetween">
							<button type="button" className="cancel-btn">
								<Link to="/mypage/info" style={{ textDecoration: "none" }}>
									<div className="user-btn-text">취소하기</div>
								</Link>
							</button>
							<button type="submit" className="editUserInfo-btn">
								<div className="user-btn-text">저장하기</div>
							</button>
						</div>
					</div>
				</div>
			</div>
		</form>
	);
};

export default EditPassword;
