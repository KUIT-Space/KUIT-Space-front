import TopBarText, { LeftEnum } from "@/components/TopBarText";
import { GradientBtn } from "@/pages/PayPage/GradientBtn";
import right from "@/assets/PayPage/arrow_right.svg";
import * as s from "@/pages/PayPage/PayPage.styled";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { payCompleteApi, payDetailApi, payHomeApi } from "@/apis/Pay/PayPageAPI";

export const addComma = (price: number) => {
  let returnString = price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return returnString;
};

export type PayRequestInfo = {
  payRequestId: number;
  receiveAmount: number;
  receiveTargetNum: number;
  totalAmount: number;
  totalTargetNum: number;
};

export type PayReceiveInfo = {
  payRequestTargetId: number;
  payCreatorName: string;
  requestAmount: number;
};

export type DetailPayData = {
  payRequestId: number;
  bankName: string;
  bankAccountNum: string;
  totalAmount: number;
  receiveAmount: number;
  totalTargetNum: number;
  receiveTargetNum: number;
  payTargetInfoDtoList: payTargetInfoDtoList[];
  isComplete: boolean;
};

export type payTargetInfoDtoList = {
  targetUserId: number;
  targetUserName: string;
  targetUserProfileImg: string;
  requestAmount: number;
  isComplete: boolean;
};
const PayRequestInfo = ({ data }: { data: PayRequestInfo }) => {
  const res: number = data.totalTargetNum - data.receiveTargetNum;
  const now = addComma(data.receiveAmount);
  const all = addComma(data.totalAmount);
  return (
    <s.ContentDiv style={{ marginBottom: "0.5rem" }}>
      <s.PriceDiv>
        <s.NowPriceDiv>{now}원</s.NowPriceDiv>
        <s.AllPriceDiv>/{all}원</s.AllPriceDiv>
      </s.PriceDiv>
      <s.TextDiv>정산완료까지 {res}명 남았어요</s.TextDiv>
    </s.ContentDiv>
  );
};

const PayReceiveInfo = ({ data }: { data: PayReceiveInfo }) => {
  const now = addComma(data.requestAmount);
  return (
    <s.ContentDiv style={{ marginBottom: "0.5rem" }}>
      <s.TextDiv>{data.payCreatorName}님이 정산을 요청했어요</s.TextDiv>
      <s.NowPriceDiv>{now}원</s.NowPriceDiv>
    </s.ContentDiv>
  );
};

const PayPage = () => {
  const [reqData, setReqData] = useState<PayRequestInfo[] | undefined>([]);
  const [recData, setRecData] = useState<PayReceiveInfo[] | undefined>([]);

  useEffect(() => {
    console.log(reqData);
    // RequestPayInfo(setReqData, setRecData);
  }, [reqData]);
  useEffect(() => {
    const str = localStorage.getItem("SpaceId");

    if (str !== null) {
      const SpaceID = Number.parseInt(str);
      payHomeApi(SpaceID, setReqData, setRecData);
    }
  }, []);

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
          style={{ cursor: "pointer" }}
          onClick={() => {
            navigator("/requestingpay");
          }}
        >
          <s.TitleDiv>
            <s.TitleContentDiv>요청한 정산</s.TitleContentDiv>
            <img src={right}></img>
            {/* <img src={right} onClick={navigator("요청정산페이지")}></img> */}
          </s.TitleDiv>
          {reqData?.length == 0 ? (
            <s.NoAlertDiv>요청한 정산이 없어요!</s.NoAlertDiv>
          ) : (
            <div>
              {reqData?.map((value) => {
                return <PayRequestInfo key={value.payRequestId} data={value}></PayRequestInfo>;
              })}
            </div>
          )}
        </s.RoundDiv>
        <s.RoundDiv
          style={{ cursor: "pointer" }}
          onClick={() => {
            navigator("/requestedpay");
          }}
        >
          <s.TitleDiv>
            <s.TitleContentDiv>요청받은 정산</s.TitleContentDiv>
            <img src={right}></img>
            {/* <img src={right} onClick={navigator("요청받은정산페이지")}></img> */}
          </s.TitleDiv>
          <div>
            {recData?.length == 0 ? (
              <s.NoAlertDiv>요청받은 정산이 없어요!</s.NoAlertDiv>
            ) : (
              <div>
                {recData?.map((value) => {
                  return (
                    <PayReceiveInfo key={value.payRequestTargetId} data={value}></PayReceiveInfo>
                  );
                })}
              </div>
            )}
          </div>
        </s.RoundDiv>
      </s.ContainerDiv>
    </>
  );
};

export default PayPage;
