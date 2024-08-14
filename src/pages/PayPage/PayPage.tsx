import TopBarText, { LeftEnum } from "@/components/TopBarText";
import { GradientBtn } from "@/pages/PayPage/GradientBtn";
import right from "@/assets/PayPage/arrow_right.svg";
import * as s from "@/pages/PayPage/PayPage.styled";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { payCompleteApi, payHomeApi } from "@/apis/Pay/PayPageAPI";

const SpaceID = 3;

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

const PayRequestInfo = ({ data }: { data: PayRequestInfo }) => {
  const res: number = data.totalTargetNum - data.receiveAmount;
  return (
    <s.ContentDiv>
      <s.PriceDiv>
        <s.NowPriceDiv>{data.receiveAmount}원</s.NowPriceDiv>
        <s.AllPriceDiv>/{data.totalAmount}원</s.AllPriceDiv>
      </s.PriceDiv>
      <s.TextDiv>정산완료까지 {res}명 남았어요</s.TextDiv>
    </s.ContentDiv>
  );
};

const PayReceiveInfo = ({ data }: { data: PayReceiveInfo }) => {
  return (
    <s.ContentDiv>
      <s.TextDiv>{data.payCreatorName}님이 정산을 요청했어요</s.TextDiv>
      <s.NowPriceDiv>{data.requestAmount}원</s.NowPriceDiv>
    </s.ContentDiv>
  );
};

// function RequestPayInfo(
//   setReqData: React.Dispatch<React.SetStateAction<PayRequestInfo[] | undefined>>,
//   setRecData: React.Dispatch<React.SetStateAction<PayReceiveInfo[] | undefined>>,
// ) {
//   const response = fetch("/api/space/3/pay", {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization:
//         "Bearer eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE3MjM1MDcyNjYsImV4cCI6MTcyMzUxMDg2NiwidXNlcklkIjo1M30.qtOD23WXy5y4Rn6rk1mp1Q6CcgcEEdhB7Vq7udwakmk",
//     },
//   })
//     .then((res) => res.json())
//     .then((data) => {
//       setReqData(data.result.payRequestInfoDtoList);
//       setRecData(data.result.payReceiveInfoDtoList);
//     });
// }
const PayPage = () => {
  const [reqData, setReqData] = useState<PayRequestInfo[] | undefined>([]);
  const [recData, setRecData] = useState<PayReceiveInfo[] | undefined>([]);

  useEffect(() => {
    //임시
    localStorage.setItem(
      "Authorization",
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE3MjM1OTM1NTksImV4cCI6MTcyMzU5NzE1OSwidXNlcklkIjo1M30.kzxPLUuktyei7O8steoNxNfU7nNY7KI-bsCn8oKkKtM",
    );
    payHomeApi(SpaceID, setReqData, setRecData);
    // RequestPayInfo(setReqData, setRecData);
  }, []);

  const navigator = useNavigate();
  const data = {
    payRequestTargetId: 1,
  };

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
          {reqData?.map((value) => {
            return <PayRequestInfo key={value.payRequestId} data={value}></PayRequestInfo>;
          })}
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

          {recData?.map((value) => {
            return <PayReceiveInfo key={value.payRequestTargetId} data={value}></PayReceiveInfo>;
          })}
        </s.RoundDiv>
      </s.ContainerDiv>
    </>
  );
};

export default PayPage;
