import { useNavigate } from "react-router-dom";

import { PayRequestInfoInHome, RequestedPayInfoInHome, usePayHomeQuery } from "@/apis/Pay";
import right from "@/assets/PayPage/arrow_right.svg";
import TopBarText, { LeftEnum } from "@/components/TopBarText";
import { GradientBtn } from "@/pages/PayPage/GradientBtn";
import * as s from "@/pages/PayPage/PayPage.styled";
import { SPACE_ID } from "@/utils/constants";
import authSpaceStore from "@/stores/authSpaceStore";

export const addComma = (price: number) => {
  const returnString = price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
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
  complete: boolean;
};
const PayRequestInfo = ({ data }: { data: PayRequestInfoInHome }) => {
  const res: number = data.totalTargetNum - data.sendCompleteTargetNum;
  const now = addComma(data.receivedAmount);
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

const PayReceiveInfo = ({ data }: { data: RequestedPayInfoInHome }) => {
  const now = addComma(data.requestedAmount);
  return (
    <s.ContentDiv style={{ marginBottom: "0.5rem" }}>
      <s.TextDiv>{data.payCreatorName}님이 정산을 요청했어요</s.TextDiv>
      <s.NowPriceDiv>{now}원</s.NowPriceDiv>
    </s.ContentDiv>
  );
};

const PayPage = () => {
  // const [reqData, setReqData] = useState<PayRequestInfo[] | undefined>([]);
  // const [recData, setRecData] = useState<PayReceiveInfo[] | undefined>([]);

  // useEffect(() => {
  //   console.log(reqData);
  //   // RequestPayInfo(setReqData, setRecData);
  // }, [reqData]);
  // useEffect(() => {
  //   const str = localStorage.getItem("spaceId");

  //   if (str !== null) {
  //     const SpaceID = Number.parseInt(str);
  //     payHomeApi(SpaceID, setReqData, setRecData);
  //   }
  // }, []);
  const navigator = useNavigate();
  const { data } = usePayHomeQuery(SPACE_ID);

  if (data.result == undefined) {
    return <></>;
  }
  const reqData = data.result.requestInfoInHome;
  const recData = data.result.requestedPayInfoInHome;
  const canManageSpace = authSpaceStore((state) => state.canManageSpace);
  return (
    <>
      <TopBarText left={LeftEnum.Logo} center="정산하기" right=""></TopBarText>
      <s.ContainerDiv>
        {canManageSpace(SPACE_ID) && (
          <GradientBtn
            onClick={() => {
              navigator("/pay/create");
            }}
          >
            정산 시작하기
          </GradientBtn>
        )}

        <s.RoundDiv
          style={{ cursor: "pointer" }}
          onClick={() => {
            navigator("/requestingpay");
          }}
        >
          <s.TitleDiv>
            <s.TitleContentDiv>요청한 정산</s.TitleContentDiv>
            <img src={right} alt="right" />
            {/* <img src={right} onClick={navigator("요청정산페이지")} alt="right" /> */}
          </s.TitleDiv>
          {}
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
            <img src={right} alt="right" />
            {/* <img src={right} onClick={navigator("요청받은정산페이지")} /> */}
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
