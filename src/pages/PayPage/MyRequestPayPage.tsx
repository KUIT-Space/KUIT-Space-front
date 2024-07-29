import TopBarText, { LeftEnum } from "@/components/TopBarText";
import * as s from "@/pages/PayPage/PayPage.styled";
import { useState } from "react";

const MyRequestPayPage = () => {
	const [index, setIndex] = useState(-1);

	return (
		<>
			<TopBarText left={LeftEnum.Back} center="내가 요청한 정산" right=""></TopBarText>
			<s.ContainerDiv>
				<div>
					<s.TitleContentDiv>진행 중인 정산</s.TitleContentDiv>
					<s.RoundDiv>
						<s.RowFlexDiv style={{ position: "relative" }}>
							<s.ColumnFlexDiv>
								<s.TextDiv>정산 완료까지 2명 남았어요</s.TextDiv>
								<s.PriceDiv style={{ marginTop: "0.5rem" }}>
									<s.NowPriceDiv>40000원</s.NowPriceDiv>
									<s.AllPriceDiv> / 60000원</s.AllPriceDiv>
								</s.PriceDiv>
							</s.ColumnFlexDiv>
							<s.ImgDiv>이미지 넣어야댐</s.ImgDiv>
						</s.RowFlexDiv>
					</s.RoundDiv>
				</div>
				<div style={{ marginTop: "2.75rem" }}>
					<s.TitleContentDiv>완료된 정산</s.TitleContentDiv>
					<s.GrayRoundDiv>
						<s.RowFlexDiv style={{ position: "relative" }}>
							<s.ColumnFlexDiv>
								<s.GrayTextDiv>5명 정산완료</s.GrayTextDiv>
								<s.PriceDiv style={{ marginTop: "0.5rem" }}>
									<s.GrayBTextDiv>40000원</s.GrayBTextDiv>
									<s.GrayTextDiv> / 60000원</s.GrayTextDiv>
								</s.PriceDiv>
							</s.ColumnFlexDiv>
							<s.ImgDiv>이미지 넣어야댐</s.ImgDiv>
						</s.RowFlexDiv>
					</s.GrayRoundDiv>
				</div>
			</s.ContainerDiv>
		</>
	);
};

export default MyRequestPayPage;
