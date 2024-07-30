import * as s from "@/pages/PayPage/PayPage.styled";
import { NormalBtn } from "./NormalBtn";
import reactIcon from "@/assets/react.svg";

const ReqDataDiv = () => {
	const onClick = () => {
		alert("클릭!");
	};
	return (
		<s.RoundDiv style={{ marginBottom: "2.75rem" }}>
			<s.RowFlexDiv style={{ alignItems: "center" }}>
				<img src={reactIcon} width={"40px"} height={"40px"} style={{ marginRight: "10px" }}></img>
				<s.TextDiv style={{ color: "white" }}>박규환</s.TextDiv>
				<s.NowPriceDiv style={{ position: "absolute", right: 0, transform: "translate(-50%,0%)" }}>15,000원</s.NowPriceDiv>
			</s.RowFlexDiv>
			<div style={{ width: "100%", display: "flex" }}>
				<NormalBtn style={{ flexGrow: 1 }} onClick={onClick}>
					송금하기
				</NormalBtn>
			</div>
		</s.RoundDiv>
	);
};

export default ReqDataDiv;
