import { BottomBtn } from "@/components/BottomBtn";
import Check from "@/assets/PayPage/check.svg";
import * as s from "@/pages/PayPage/PayPage.styled";
import { useNavigate } from "react-router-dom";

const CompleteCreatePay = () => {
  const navigator = useNavigate();
  return (
    <>
      {/* 여기에 지금 height 넣어줘야 */}
      <s.ContainerDiv>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <img src={Check}></img>
        </div>
        <s.LargeTxt style={{ flex: 1, textAlign: "center" }}>
          <p>정산요청을</p>
          <p>완료했어요!</p>
        </s.LargeTxt>

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

export default CompleteCreatePay;
