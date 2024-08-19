import TopBarText, { LeftEnum } from "@/components/TopBarText";
import * as s from "@/pages/PayPage/PayPage.styled";
import { useEffect, useState } from "react";
import MyReqDataDiv from "@/pages/PayPage/MyReqDataDiv";
import GrayMyReqDataDiv from "@/pages/PayPage/GrayMyReqDataDiv";
import { useNavigate, useParams } from "react-router-dom";

import PayResult from "@/pages/PayPage/PayResult";
import { DetailPayData, PayRequestInfo, addComma } from "@/pages/PayPage/PayPage";
import { payDetailApi, payRequestApi } from "@/apis/Pay/PayPageAPI";
import { payTargetInfoDtoList } from "@/pages/PayPage/PayPage";

const MyRequestPayPage = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const [currentData, setCurrentData] = useState<PayRequestInfo[] | undefined>([]);
  const [completeData, setCompleteData] = useState<PayRequestInfo[] | undefined>([]);
  const [detailData, setDetailData] = useState<DetailPayData | undefined>();
  const [currentAmount, setCurrentAmount] = useState<string>();
  const [totalAmount, setTotalAmount] = useState<string>();

  const [completeTargetList, setCompleteTargetList] = useState<payTargetInfoDtoList[]>([]);
  const [inCompleteTargetList, setInCompleteTargetList] = useState<payTargetInfoDtoList[]>([]);

  const navigator = useNavigate();

  const menuArr = [
    { name: "미정산", content: "Tab menu ONE" },
    { name: "정산완료", content: "Tab menu TWO" },
  ];
  const dataArr = [
    { image: "aa", name: "박규환", amount: "15000원", chk: true },
    { image: "aa", name: "박규환", amount: "15000원", chk: true },
  ];
  const selectMenuHandler = (index: number) => {
    setTabIndex(index);
  };

  const redirectDetailPage = (index: number) => {
    navigator(`/requestingpay/${index}`);
  };
  let { id } = useParams();
  // useEffect(()=>{

  // },[activeTargetList,inActiveTargetList])

  useEffect(() => {
    if (detailData !== undefined) {
      setCompleteTargetList([]);
      setInCompleteTargetList([]);

      setCurrentAmount(addComma(detailData?.receiveAmount));
      setTotalAmount(addComma(detailData.totalAmount));
      if (detailData.payTargetInfoDtoList !== undefined) {
        detailData.payTargetInfoDtoList.map((value, index) => {
          {
            value.isComplete
              ? setCompleteTargetList((activeVrList) => [...(activeVrList || []), value])
              : setInCompleteTargetList((inactiveVrList) => [...(inactiveVrList || []), value]);
          }
        });
      }
    }
  }, [detailData]);

  useEffect(() => {
    const _id = localStorage.getItem("spaceId");
    if (_id !== null) {
      const spaceID = Number.parseInt(_id);
      if (id === undefined) {
        payRequestApi(spaceID, setCurrentData, setCompleteData);
      } else {
        payDetailApi(spaceID, Number.parseInt(id), setDetailData);
      }
    }
  }, [id]);

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
              <s.NowPriceDiv>{currentAmount}원 &nbsp;</s.NowPriceDiv>
              <s.AllPriceDiv> / {totalAmount}원</s.AllPriceDiv>
            </s.RowFlexDiv>
            {/* TODO date */}
            <s.GrayTextDiv>요청 날짜 2024.06.12</s.GrayTextDiv>
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
              {completeTargetList.length === 0 ? (
                <>
                  <s.NoAlertDiv>미정산 된 유저가 없어요!</s.NoAlertDiv>
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
              {inCompleteTargetList.length === 0 ? (
                <>
                  <s.NoAlertDiv>정산완료 된 유저가 없어요!</s.NoAlertDiv>
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
