import { useNavigate } from "react-router-dom";

import Check from "@/assets/PayPage/check.svg";
import { BottomBtn } from "@/components/BottomBtn";
import * as s from "@/pages/PayPage/PayPage.styled";

export type CompletePayType = {
  money?: number;
  account?: string;
};

const CompletePay = ({ money, account }: CompletePayType) => {
  const navigator = useNavigate();

  return (
    <>
      {/* 여기에 지금 height 넣어줘야 */}
      <s.ContainerDiv>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <img src={Check} alt="check"></img>
        </div>
        <s.LargeTxt style={{ flex: 1, textAlign: "center" }}>
          <p>요청받은 정산을</p>
          <p>완료하였어요!</p>
        </s.LargeTxt>
        <s.RoundDiv>
          <s.ColumnFlexDiv>
            <s.RowFlexDiv>
              <div>정산금액</div>
              <div>15000원</div>
            </s.RowFlexDiv>
            <s.RowFlexDiv>
              <div>입금 계좌</div>
              <div>국민 1234-14455-919293</div>
            </s.RowFlexDiv>
          </s.ColumnFlexDiv>
        </s.RoundDiv>

        <BottomBtn
          onClick={() => {
            navigator("/pay");
          }}
        >
          정산 홈으로
        </BottomBtn>
      </s.ContainerDiv>
    </>
  );
};

export default CompletePay;
