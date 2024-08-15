import * as s from "@/pages/PayPage/PayPage.styled";

const GrayMyReqDataDiv = () => {
	return (
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
	);
};

export default GrayMyReqDataDiv;
