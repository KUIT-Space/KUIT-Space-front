import * as s from "@/pages/PayPage/PayPage.styled";
import { PayRequestInfo } from "@/pages/PayPage/PayPage";
import { addComma } from "@/pages/PayPage/PayPage";
import { ResponseOfPayRequestInfo } from "@/apis/Pay";

const MyReqDataDiv = ({
  data,
  onClick,
}: {
  data: ResponseOfPayRequestInfo;
  onClick: () => void;
}) => {
  const num = data.totalTargetNum - data.sendCompleteTargetNum;
  const price1 = addComma(data.receivedAmount);
  const price2 = addComma(data.totalAmount);

  return (
    <s.RoundDiv onClick={onClick}>
      <s.RowFlexDiv style={{ position: "relative" }}>
        <s.ColumnFlexDiv>
          <s.TextDiv>정산 완료까지 {num}명 남았어요</s.TextDiv>
          <s.PriceDiv style={{ marginTop: "0.5rem" }}>
            <s.NowPriceDiv>{price1}원&nbsp;</s.NowPriceDiv>
            <s.AllPriceDiv> / {price2}원 </s.AllPriceDiv>
          </s.PriceDiv>
        </s.ColumnFlexDiv>
        <s.ImgDiv>이미지 넣어야댐</s.ImgDiv>
      </s.RowFlexDiv>
    </s.RoundDiv>
  );
};

export default MyReqDataDiv;
