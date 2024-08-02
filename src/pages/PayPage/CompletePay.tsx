import { BottomBtn } from "@/components/BottomBtn";
import Check from "@/assets/PayPage/check.svg";
import * as s from "@/pages/PayPage/PayPage.styled";

export type CompletePayType = {
  money?: number;
  account?: string;
};

const CompletePay = ({ money, account }: CompletePayType) => {
  console.log(money);
  console.log(account);
  return (
    <>
      {/* 여기에 지금 height 넣어줘야 */}
      <s.ContainerDiv>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <img src={Check}></img>
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

        <BottomBtn>정산 홈으로</BottomBtn>
      </s.ContainerDiv>
    </>
  );
};

export default CompletePay;
