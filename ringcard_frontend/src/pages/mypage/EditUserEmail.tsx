import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../styles/layout/layout.css";
import "../../styles/layout/header.css";
import "../../styles/user/userHeader.css";
import "../../styles/user/userBox.css";
import "../../styles/user/userIcon.css";
import "../../styles/editUserInfo.css";
import HeaderNoProfile from "../../components/Header/HeaderNoProfile";
import { useForm } from "react-hook-form";
import UserProfile from "../../components/atoms/UserProfile";
import { Link } from "react-router-dom";

type FormValues = {
	userEmail: string;
};

const EditUserEmail = () => {
	type ResponseList = {
		sameUserEmail: boolean;
		overlappedUserEmail: boolean;
	};
	const [response, setResponse] = useState<ResponseList>({
		sameUserEmail: false,
		overlappedUserEmail: false,
	});

	const [submitted, setSubmitted] = useState(false);

	const [user, setUser] = useState<any>([]);
	const [userEmail, setUserEmail] = useState();

	useEffect(() => {
		axios
			.get("/mypage/info/edit")
			.then((res) => {
				setUser(res.data);
				setUserEmail(res.data.userEmail);
			})
			.catch(function (error) {
				console.log(error.config);
			});
	}, []);

	const onSubmit = async (data: any) => {
		await new Promise((r) => setTimeout(r, 100));

		await axios
			.post("/mypage/info/edit/userEmail", data)
			.then((res) => {
				setResponse(res.data);
				setSubmitted(true);
			})
			.catch(function (error) {
				console.log(error.config);
			});
	};

	function RedirectAndInputErrors() {
		if (response.sameUserEmail) {
			return (
				<div className="user-text-error">
					변경할 이메일을 기존 이메일과 다르게 입력해 주세요.
				</div>
			);
		} else if (response.overlappedUserEmail) {
			return <div className="user-text-error">이미 존재하는 이메일입니다.</div>;
		} else if (submitted) {
			localStorage.setItem("toastShow", "1");
			localStorage.setItem("toastText", "개인 정보가 수정되었습니다.");
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
							<div className="user-text">기존 이메일</div>
							<input
								className="user-icon user-icon-user-dark"
								value={userEmail}
								readOnly
							></input>
						</div>

						<div className="user-box-in">
							<div className="user-text">변경할 이메일</div>
							<input
								className="user-icon user-icon-user-light"
								type="email"
								placeholder="변경할 이메일을 입력해주세요."
								{...register("userEmail", {
									required:
										"이메일은 필수입력이며, 비밀번호 찾을 때 사용됩니다.",
									pattern: {
										value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
										message: "이메일 형식이 아닙니다.",
									},
								})}
							></input>
							<div className="Join-input-error-message">
								{errors?.userEmail && <p>{errors.userEmail.message}</p>}
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

export default EditUserEmail;
