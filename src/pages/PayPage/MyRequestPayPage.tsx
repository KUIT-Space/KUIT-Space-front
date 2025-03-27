import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { usePayDetailQuery, usePayRequestListQuery } from "@/apis/Pay";
import TopBarText, { LeftEnum } from "@/components/TopBarText";
import GrayMyReqDataDiv from "@/pages/PayPage/GrayMyReqDataDiv";
import MyReqDataDiv from "@/pages/PayPage/MyReqDataDiv";
import * as s from "@/pages/PayPage/PayPage.styled";
import PayResult from "@/pages/PayPage/PayResult";
import { SPACE_ID } from "@/utils/constants";

const MyRequestPayPage = () => {
  const { id } = useParams();
  const [tabIndex, setTabIndex] = useState(0);
  // const [currentData, setCurrentData] = useState<PayRequestInfo[] | undefined>([]);
  // const [completeData, setCompleteData] = useState<PayRequestInfo[] | undefined>([]);
  // const [detailData, setDetailData] = useState<DetailPayData | undefined>();
  // const [currentAmount, setCurrentAmount] = useState<string>();
  // const [totalAmount, setTotalAmount] = useState<string>();

  // const [completeTargetList, setCompleteTargetList] = useState<payTargetInfoDtoList[]>([]);
  // const [inCompleteTargetList, setInCompleteTargetList] = useState<payTargetInfoDtoList[]>([]);
  const { data } = usePayRequestListQuery(SPACE_ID);
  const detail = id == null ? null : usePayDetailQuery(SPACE_ID, Number(id));
  const detailData = detail?.data.result;
  if (data.result == undefined) {
    return <></>;
  }
  const currentData = data.result.inCompletePayRequestList;
  const completeData = data.result.completePayRequestList;
  const completeTargetList = detailData?.responseOfTargetDetails.map((value) => {
    if (value.complete === true) return value;
  });
  const inCompleteTargetList = detailData?.responseOfTargetDetails.map((value) => {
    if (value.complete === false) return value;
  });

  const navigator = useNavigate();

  const menuArr = [
    { name: "미정산", content: "Tab menu ONE" },
    { name: "정산완료", content: "Tab menu TWO" },
  ];
  const selectMenuHandler = (index: number) => {
    setTabIndex(index);
  };

  const redirectDetailPage = (index: number) => {
    navigator(`/requestingpay/${index}`);
  };
  return (
    <>
      <TopBarText left={LeftEnum.Back} center="내가 요청한 정산" right=""></TopBarText>
      {typeof id === "undefined" ? (
        <s.ContainerDiv>
          <div>
            <s.TitleContentDiv>진행 중인 정산</s.TitleContentDiv>
            {currentData?.length == 0 ? (
              <s.NoAlertDiv>요청한 정산이 없어요!</s.NoAlertDiv>
            ) : (
              <div>
                {currentData?.map((value) => {
                  return (
                    <MyReqDataDiv
                      key={value.payRequestId}
                      data={value}
                      onClick={() => redirectDetailPage(value.payRequestId)}
                    ></MyReqDataDiv>
                  );
                })}
              </div>
            )}
          </div>
          <div style={{ marginTop: "2.75rem" }}>
            <s.TitleContentDiv>완료된 정산</s.TitleContentDiv>
            {completeData?.length == 0 ? (
              <s.NoAlertDiv>요청한 정산이 없어요!</s.NoAlertDiv>
            ) : (
              <div>
                {completeData?.map((value) => {
                  return (
                    <GrayMyReqDataDiv
                      key={value.payRequestId}
                      data={value}
                      onClick={() => redirectDetailPage(value.payRequestId)}
                    ></GrayMyReqDataDiv>
                  );
                })}
              </div>
            )}
          </div>
        </s.ContainerDiv>
      ) : (
        <>
          <s.CompletePayDiv style={{ padding: "2.5rem 1rem 0.75rem 1rem", margin: "0.75rem" }}>
            <s.TextDiv style={{ marginBottom: "0.5rem" }}>정산 완료된 금액</s.TextDiv>
            <s.RowFlexDiv style={{ alignItems: "end", marginBottom: "1.75rem" }}>
              <s.NowPriceDiv>{detailData?.receivedAmount}원 &nbsp;</s.NowPriceDiv>
              <s.AllPriceDiv> / {detailData?.totalAmount}원</s.AllPriceDiv>
            </s.RowFlexDiv>
            {/* TODO date */}
            <s.GrayTextDiv>요청 날짜 2024.08.20</s.GrayTextDiv>
          </s.CompletePayDiv>
          <s.TabMenu>
            {menuArr.map((value, index) => (
              <li
                key={index}
                className={index === tabIndex ? "submenu focused" : "submenu"}
                onClick={() => selectMenuHandler(index)}
              >
                {value.name}
              </li>
            ))}
          </s.TabMenu>
          {tabIndex ? (
            <s.RoundDiv style={{ margin: "0.75rem 1.25rem 0.75rem 1.25rem" }}>
              {completeTargetList === undefined ? (
                <>
                  <s.NoAlertDiv>정산완료 된 유저가 없어요!</s.NoAlertDiv>
                </>
              ) : (
                <>
                  {completeTargetList.map((value, index) => (
                    <PayResult key={index} props={value}></PayResult>
                  ))}
                </>
              )}
            </s.RoundDiv>
          ) : (
            <s.RoundDiv style={{ margin: "0.75rem 1.25rem 0.75rem 1.25rem" }}>
              {inCompleteTargetList === undefined ? (
                <>
                  <s.NoAlertDiv>미정산 된 유저가 없어요!</s.NoAlertDiv>
                </>
              ) : (
                <>
                  {inCompleteTargetList.map((value, index) => (
                    <PayResult key={index} props={value}></PayResult>
                  ))}
                </>
              )}
            </s.RoundDiv>
          )}
        </>
      )}
    </>
  );
};

export default MyRequestPayPage;
