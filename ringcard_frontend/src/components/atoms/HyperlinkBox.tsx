import "../../styles/hyperlinkBox.css";

export interface Props {
	hyperlinkContent: String;
}

function HyperlinkBox(props: Props) {
	const handleHyperlinkClick = async () => {
		if (hyperlink.startsWith("http")) {
			window.open(hyperlink, "_blank");
		} else {
			window.open("https://" + hyperlink, "_blank");
		}
	};
	const hyperlink = String(props.hyperlinkContent);
	return (
		<div className="HyperlinkBox-container">
			<div className="HyperlinkBox-link-icn-container">
				<img src="/buttons/link-icn.svg" alt="" />
			</div>
			<div
				className="HyperlinkBox-hyperlink-container"
				onClick={handleHyperlinkClick}
			>
				{hyperlink}
			</div>
		</div>
	);
}

export default HyperlinkBox;
