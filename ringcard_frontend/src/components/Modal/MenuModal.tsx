import React, { ReactElement } from "react";
import { Link } from "react-router-dom";
import "../../styles/layout/modal.css";

interface props {
	open: boolean;
	close: () => void; // 함수 타입 정의할 때
}

const Modal = (props: props): ReactElement => {
	const { open, close } = props;

	return (
		<>
			<div className={open ? "bg" : ""} />
			<div className={open ? "modal active" : "modal"}>
				{open ? (
					<div className="area">
						<div className="modal-close">
							<button onClick={close}>
								<img src="/buttons/x.svg" alt=""></img>
							</button>
						</div>
						<hr className="menu-modal-hr" />
						<div className="menu-container">
							<Link to={"/mypage/info"} style={{ textDecoration: "none" }}>
								<div className="menu-element">마이 페이지</div>
							</Link>
							<Link to={"/suggestion"} style={{ textDecoration: "none" }}>
								<div className="menu-element">건의사항</div>
							</Link>

							<Link to={"/logout"} style={{ textDecoration: "none" }}>
								<div className="menu-element">로그아웃</div>
							</Link>
						</div>
					</div>
				) : null}
			</div>
		</>
	);
};
export default Modal;
