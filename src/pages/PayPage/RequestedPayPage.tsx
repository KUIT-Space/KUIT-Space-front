import TopBarText, { LeftEnum } from "@/components/TopBarText";
import * as s from "@/pages/PayPage/PayPage.styled";
import reactIcon from "@/assets/react.svg";
import { NormalBtn } from "./NormalBtn";
import { GrayBtn } from "./GrayBtn";
import ReqDataDiv from "./ReqDataDiv";

const RequestedPayPage = () => {
	return (
		<>
			<TopBarText left={LeftEnum.Back} center="요청받은 정산" right=""></TopBarText>
			<s.ContainerDiv>
				<s.TitleContentDiv>진행 중인 정산</s.TitleContentDiv>
				<ReqDataDiv></ReqDataDiv>
				<s.TitleContentDiv>완료된 정산</s.TitleContentDiv>
				<s.GrayRoundDiv>
					<s.RowFlexDiv style={{ alignItems: "center" }}>
						<img src={reactIcon} width={"40px"} height={"40px"} style={{ marginRight: "10px" }}></img>
						<s.TextDiv>박규환</s.TextDiv>
						<s.GrayBTextDiv style={{ position: "absolute", right: 0, transform: "translate(-50%,0%)" }}>15,000원</s.GrayBTextDiv>
					</s.RowFlexDiv>
					<div style={{ width: "100%", display: "flex" }}>
						<GrayBtn style={{ flexGrow: 1 }}>송금하기</GrayBtn>
					</div>
				</s.GrayRoundDiv>
			</s.ContainerDiv>
		</>
	);
};

export default RequestedPayPage;
