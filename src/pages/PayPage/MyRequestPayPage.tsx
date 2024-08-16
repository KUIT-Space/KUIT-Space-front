import TopBarText, { LeftEnum } from "@/components/TopBarText";
import * as s from "@/pages/PayPage/PayPage.styled";
import { useEffect, useState } from "react";
import MyReqDataDiv from "@/pages/PayPage/MyReqDataDiv";
import GrayMyReqDataDiv from "@/pages/PayPage/GrayMyReqDataDiv";
import { useParams } from "react-router-dom";

import PayResult from "@/pages/PayPage/PayResult";
import { PayRequestInfo } from "@/pages/PayPage/PayPage";
import { payRequestApi } from "@/apis/Pay/PayPageAPI";

const MyRequestPayPage = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const [currentData, setCurrentData] = useState<PayRequestInfo[] | undefined>([]);
  const [completeData, setCompleteData] = useState<PayRequestInfo[] | undefined>([]);

  const spaceID = 3;
  useEffect(() => {
    payRequestApi(spaceID, setCurrentData, setCompleteData);
  }, []);
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
  let { id } = useParams();
  return (
    <>
      <TopBarText left={LeftEnum.Back} center="내가 요청한 정산" right=""></TopBarText>
      {typeof id === "undefined" ? (
        <s.ContainerDiv>
          <div>
            <s.TitleContentDiv>진행 중인 정산</s.TitleContentDiv>
            {currentData?.map((value) => {
              return <MyReqDataDiv key={value.payRequestId} data={value}></MyReqDataDiv>;
            })}
          </div>
          <div style={{ marginTop: "2.75rem" }}>
            <s.TitleContentDiv>완료된 정산</s.TitleContentDiv>
            {completeData?.map((value) => {
              return <GrayMyReqDataDiv key={value.payRequestId} data={value}></GrayMyReqDataDiv>;
            })}
          </div>
        </s.ContainerDiv>
      ) : (
        <>
          <s.CompletePayDiv style={{ padding: "2.5rem 1rem 0.75rem 1rem", margin: "0.75rem" }}>
            <s.TextDiv style={{ marginBottom: "0.5rem" }}>정산 완료된 금액</s.TextDiv>
            <s.RowFlexDiv style={{ alignItems: "end", marginBottom: "1.75rem" }}>
              <s.NowPriceDiv>30000원</s.NowPriceDiv>
              <s.AllPriceDiv> / 60000원</s.AllPriceDiv>
            </s.RowFlexDiv>
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
          <s.RoundDiv style={{ margin: "0.75rem 1.25rem 0.75rem 1.25rem" }}>
            {dataArr.map((value, index) => (
              <PayResult key={index} props={value}></PayResult>
            ))}
          </s.RoundDiv>
        </>
      )}
    </>
  );
};

export default MyRequestPayPage;
