import { ResponseOfPayRequestInfo } from "@/apis/Pay";
import { addComma } from "@/pages/PayPage/PayPage";
import * as s from "@/pages/PayPage/PayPage.styled";

const GrayMyReqDataDiv = ({
  data,
  onClick,
}: {
  data: ResponseOfPayRequestInfo;
  onClick: () => void;
}) => {
  const num = data.sendCompleteTargetNum;
  const price1 = addComma(data.receivedAmount);
  const price2 = addComma(data.totalAmount);
  return (
    <s.GrayRoundDiv onClick={onClick}>
      <s.RowFlexDiv style={{ position: "relative" }}>
        <s.ColumnFlexDiv>
          <s.GrayTextDiv>{num}명 정산완료</s.GrayTextDiv>
          <s.PriceDiv style={{ marginTop: "0.5rem" }}>
            <s.GrayBTextDiv>{price1}원&nbsp;</s.GrayBTextDiv>
            <s.GrayTextDiv> / {price2}원</s.GrayTextDiv>
          </s.PriceDiv>
        </s.ColumnFlexDiv>
        <s.ImgDiv></s.ImgDiv>
      </s.RowFlexDiv>
    </s.GrayRoundDiv>
  );
};

export default GrayMyReqDataDiv;
