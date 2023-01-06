import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../styles/layout/layout.css";
import "../../styles/layout/header.css";
import "../../styles/user/userBox.css";
import "../../styles/user/userIcon.css";
import "../../styles/user/userHeader.css";
import "../../styles/layout/reactToast.css";
import "../../styles/login.css";

import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import HeaderRingca from "../../components/Header/HeaderRingca";
import BtnToTwitterLogin from "./Twitter/BtnToTwitterLogin";

type FormValues = {
	username: string;
	password: string;
};

const Login = () => {
	useEffect(() => {
		axios
			.all([axios.get("/loginForm"), axios.get("/"), axios.get("")])
			.then(axios.spread((res1, res2, res3) => {}))
			.catch(function (error) {
				console.log(error.config);
			});
	}, []);

	const onSubmit = async (data: any) => {
		await new Promise((r) => setTimeout(r, 100));

		await axios
			.post("/login", data, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			})
			.then((res) => {
				window.location.replace("/home/unanswered");
			})
			.catch(function (error) {
				console.log(error.config);
			});
	};

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormValues>({ mode: "onSubmit" });

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

	function BtnToJoin() {
		function handleClick(e: any) {
			window.location.href = "/joinForm";
		}
		return (
			<div className="login-join" onClick={handleClick}>
				<div className="login-join-text">아직 링카의 회원이 아니신가요?</div>
			</div>
		);
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div className="container">
				<HeaderRingca />
				<div className="user-box">
					<div className="user-box-in">
						<div className="user-text">아이디</div>
						<div className="user-box-div-light user-icon-user-light">
							<span className="user-icon-bar">|</span>
							<input
								className="user-inner-transparent"
								placeholder="아이디를 입력해주세요."
								{...register("username", {
									required: "아이디가 입력되지 않았습니다.",
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
								placeholder="비밀번호를 입력해주세요."
								{...register("password", {
									required: "비밀번호가 입력되지 않았습니다.",
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
						<div className="Login-findPwd-text-box">
							<Link
								to="/findPassword"
								style={{
									textDecorationColor: "white",
									textDecorationThickness: "0.5px",
									color: "white",
								}}
							>
								비밀번호를 잊으셨나요?
							</Link>
						</div>
					</div>
					<div className="user-box-in">
						<button type="submit" className="user-btn">
							<div className="user-btn-text">로그인</div>
						</button>
					</div>

					<div className="Login-twitter-login-btn">
						<BtnToTwitterLogin />
					</div>
					<div className="login-join-box">
						<BtnToJoin />
					</div>
				</div>
			</div>
		</form>
	);
};

export default Login;
