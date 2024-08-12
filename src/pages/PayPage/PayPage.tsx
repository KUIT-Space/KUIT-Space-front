import TopBarText, { LeftEnum } from "@/components/TopBarText";
import { GradientBtn } from "@/pages/PayPage/GradientBtn";
import right from "@/assets/PayPage/arrow_right.svg";
import * as s from "@/pages/PayPage/PayPage.styled";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const PayRequestInfo = () => {
  return (
    <s.ContentDiv>
      <s.PriceDiv>
        <s.NowPriceDiv>30,000원</s.NowPriceDiv>
        <s.AllPriceDiv>/45,000원</s.AllPriceDiv>
      </s.PriceDiv>
      <s.TextDiv>정산완료까지 1명 남았어요</s.TextDiv>
    </s.ContentDiv>
  );
};

const PayReceiveInfo = () => {
  return (
    <s.ContentDiv>
      <s.TextDiv>김민지 님이 정산을 요청했어요</s.TextDiv>
      <s.NowPriceDiv>15,000원</s.NowPriceDiv>
    </s.ContentDiv>
  );
};

const RequestPayInfo = () => {};
const PayPage = () => {
  useEffect(() => {
    RequestPayInfo();
  });
  const navigator = useNavigate();
  return (
    <>
      <TopBarText left={LeftEnum.Logo} center="정산하기" right=""></TopBarText>
      <s.ContainerDiv>
        <GradientBtn
          onClick={() => {
            navigator("/pay/create");
          }}
        >
          정산 시작하기
        </GradientBtn>
        <s.RoundDiv
          onClick={() => {
            navigator("/requestingpay");
          }}
        >
          <s.TitleDiv>
            <s.TitleContentDiv>요청한 정산</s.TitleContentDiv>
            <img src={right}></img>
            {/* <img src={right} onClick={navigator("요청정산페이지")}></img> */}
          </s.TitleDiv>

          {/* 컴포넌트화 예정 */}
          <PayRequestInfo></PayRequestInfo>
          {/* 컴포넌트화 예정 */}
        </s.RoundDiv>
        <s.RoundDiv
          onClick={() => {
            navigator("/requestedpay");
          }}
        >
          <s.TitleDiv>
            <s.TitleContentDiv>요청받은 정산</s.TitleContentDiv>
            <img src={right}></img>
            {/* <img src={right} onClick={navigator("요청받은정산페이지")}></img> */}
          </s.TitleDiv>

          {/* 컴포넌트화 예정 */}
          <PayReceiveInfo></PayReceiveInfo>
          {/* 컴포넌트화 예정 */}
        </s.RoundDiv>
      </s.ContainerDiv>
    </>
  );
};

export default PayPage;
