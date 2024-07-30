import TopBarText, { LeftEnum } from "@/components/TopBarText";
import * as s from "@/pages/PayPage/PayPage.styled";
import { useState } from "react";
import MyReqDataDiv from "./MyReqDataDiv";
import GrayMyReqDataDiv from "./GrayMyReqDataDiv";

const MyRequestPayPage = () => {
	const [index, setIndex] = useState(-1);

	return (
		<>
			<TopBarText left={LeftEnum.Back} center="내가 요청한 정산" right=""></TopBarText>
			<s.ContainerDiv>
				<div>
					<s.TitleContentDiv>진행 중인 정산</s.TitleContentDiv>
					<MyReqDataDiv></MyReqDataDiv>
				</div>
				<div style={{ marginTop: "2.75rem" }}>
					<s.TitleContentDiv>완료된 정산</s.TitleContentDiv>
					<GrayMyReqDataDiv></GrayMyReqDataDiv>
				</div>
			</s.ContainerDiv>
		</>
	);
};

export default MyRequestPayPage;
