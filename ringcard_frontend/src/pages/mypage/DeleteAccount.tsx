import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../styles/layout/layout.css";
import "../../styles/layout/header.css";
import "../../styles/user/userBox.css";
import "../../styles/user/userIcon.css";
import "../../styles/user/userHeader.css";
import "../../styles/deleteAccount.css";

import { useForm } from "react-hook-form";
import UserProfile from "../../components/atoms/UserProfile";
import HeaderNoProfile from "../../components/Header/HeaderNoProfile";

const DeleteAccount = () => {
	type ResponseList = {
		passwordError: boolean;
	};
	const [response, setResponse] = useState<ResponseList>({
		passwordError: false,
	});

	const [submitted, setSubmitted] = useState(false);

	const onSubmit = async (data: any) => {
		await new Promise((r) => setTimeout(r, 100));

		await axios
			.post("/mypage/delete/account", data)
			.then((res) => {
				setResponse(res.data);
				setSubmitted(true);
			})
			.catch(function (error) {
				console.log(error.config);
			});
	};

	function RedirectAndInputErrors() {
		if (response.passwordError) {
			return <div className="user-text-error">passwordError</div>;
		} else if (submitted) {
			window.location.href = "/loginForm";
			return null;
		}
		return null;
	}

	const {
		register,
		handleSubmit,
	} = useForm();

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

	function ButtonToUserInfo() {
		function handleClick(e: any) {
			window.location.href = "/mypage/info";
		}
		return (
			<button
				className="user-btn deleteAccount-btn-cancel"
				onClick={handleClick}
			>
				<div className="user-btn-text deleteAccount-btn-text-cancel">
					링카와 계속 함께 하기!
				</div>
			</button>
		);
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
						{/* width 줄여도 글자 밑에 박스랑 다른 글자 침범하지 않도록! */}
						<div className="user-box-in" style={{ height: "120px" }}>
							<div className="user-text deleteAccount-text">
								탈퇴하실 경우, 회원님의 링카 계정과 그동안 쌓인 질문과 답변들이
								전부 즉시 영구삭제됩니다. 탈퇴하시겠습니까? 링카는 울어요ㅠㅠ
							</div>
						</div>

						<div className="user-box-in">
							<div className="user-text deleteAccount-text">
								탈퇴를 원하면 비밀번호를 입력해 주세요.
							</div>
							<div className="user-box-div user-icon-light">
								<input
									type={showPw ? "text" : "password"}
									className="user-inner-transparent"
									placeholder="비밀번호를 입력해주세요"
									{...register("password", {
										required: "답변이 입력되지 않았습니다.",
									})}
								></input>
								{showPw ? (
									<ShowPw onClick={toggleShowPw} />
								) : (
									<HidePw onClick={toggleShowPw} />
								)}
							</div>
						</div>

						<div className="user-box-in">
							<RedirectAndInputErrors />
						</div>

						<div className="user-box-in">
							<button className="user-btn deleteAccount-btn">
								<div className="user-btn-text">탈퇴하기</div>
							</button>
						</div>

						<div className="user-box-in">
							<ButtonToUserInfo />
						</div>
					</div>
				</div>
			</div>
		</form>
	);
};
export default DeleteAccount;
