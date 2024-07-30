import * as s from "@/pages/PayPage/PayPage.styled";
import { NormalBtn } from "./NormalBtn";
import reactIcon from "@/assets/react.svg";
import { useState } from "react";
import { DarkNormalBtn } from "./DarkNormalBtn";

const ReqDataDiv = () => {
	// true : 송금하기 false : 송금완료
	const [chk, setChk] = useState(true);
	const onPayClick = () => {
		setChk(!chk);
		//모달 생성
		//클립보드 복사
	};
	return (
		<s.RoundDiv style={{ marginBottom: "2.75rem" }}>
			<s.RowFlexDiv style={{ alignItems: "center" }}>
				<img src={reactIcon} width={"40px"} height={"40px"} style={{ marginRight: "10px" }}></img>
				<s.TextDiv style={{ color: "white" }}>박규환</s.TextDiv>
				<s.NowPriceDiv style={{ position: "absolute", right: 0, transform: "translate(-50%,0%)" }}>15,000원</s.NowPriceDiv>
			</s.RowFlexDiv>
			<div style={{ width: "100%", display: "flex" }}>
				{chk ? (
					<NormalBtn style={{ flexGrow: 1 }} onClick={onPayClick}>
						송금하기
					</NormalBtn>
				) : (
					<DarkNormalBtn style={{ flexGrow: 1 }} onClick={onPayClick}>
						송금완료
					</DarkNormalBtn>
				)}
			</div>
		</s.RoundDiv>
	);
};

export default ReqDataDiv;
