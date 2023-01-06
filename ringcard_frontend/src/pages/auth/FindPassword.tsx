import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import HeaderRingcaShort from "../../components/Header/HeaderRingcaShort";
import "../../styles/layout/layout.css";
import "../../styles/login.css";

function FindPassword() {
	type ResponseList = {
		bindingResultHasErrors: boolean;
		noEmailLikeThat: boolean;
	};
	const [response, setResponse] = useState<ResponseList>({
		bindingResultHasErrors: false,
		noEmailLikeThat: false,
	});
	// submitted==true여야 새로고침 되도록.
	const [submitted, setSubmitted] = useState(false);

	const onSubmit = async (data: any) => {
		await new Promise((r) => setTimeout(r, 100));

		await axios
			.post("/findPassword", data)
			.then((res) => {
				setResponse(res.data);
				setSubmitted(true);
			})
			.catch(function (error) {
				console.log(error.config);
			});
	};

	function RedirectAndInputErrors() {
		if (response.bindingResultHasErrors && response.noEmailLikeThat) {
			return (
				<>
					<div className="FindPassword-user-text-error">
						올바르지 않은 형식입니다.
					</div>
					<div className="FindPassword-user-text-error">
						존재하지 않는 이메일입니다.
					</div>
				</>
			);
		} else if (response.bindingResultHasErrors) {
			return (
				<div className="FindPassword-user-text-error">
					데이터에 에러가 발생하였습니다.
				</div>
			);
		} else if (response.noEmailLikeThat) {
			return (
				<div className="FindPassword-user-text-error">
					존재하지 않는 이메일입니다.
				</div>
			);
		} else if (submitted) {
			// 위 조건 만족할 때만 loginForm으로 새로고침
			window.location.href = "/loginForm";
			return null;
		}
		return null;
	}

	const { register, handleSubmit } = useForm();

	return (
		<div className="FindPassword-container">
			<div className="container">
				<HeaderRingcaShort />
				<form onSubmit={handleSubmit(onSubmit)} name="sendEmail">
					<div className="FindPassword-info-text">
						입력한 이메일로 임시 비밀번호가 전송됩니다.
					</div>
					<div>
						<div className="user-box-in">
							<div className="user-text">이메일을 입력해주세요.</div>
							<div className="user-box-div-light user-icon-email-light">
								<span className="user-icon-bar">|</span>
								<input
									className="user-inner-transparent"
									type="email"
									{...register("userEmail", {
										required: "가입할 때 입력한 이메일을 입력해주세요.",
									})}
								></input>
							</div>
							<RedirectAndInputErrors />
						</div>
					</div>

					<div className="user-box-in Findpassword-send-btn-box">
						<button
							type="submit"
							className="FindPassword-send-btn"
							id="checkEmail"
						>
							비밀번호 발송
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}

export default FindPassword;
