import * as s from "@/pages/PayPage/PayPage.styled";

const MyReqDataDiv = () => {
	return (
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
	);
};

export default MyReqDataDiv;
