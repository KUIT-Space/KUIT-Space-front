import TopBarText, { LeftEnum } from "@/components/TopBarText";
import * as s from "@/pages/PayPage/PayPage.styled";
import { useState } from "react";
import MyReqDataDiv from "./MyReqDataDiv";
import GrayMyReqDataDiv from "./GrayMyReqDataDiv";
import { useParams } from "react-router-dom";

const MyRequestPayPage = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const menuArr = [
    { name: "미정산", content: "Tab menu ONE" },
    { name: "정산완료", content: "Tab menu TWO" },
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
            <MyReqDataDiv></MyReqDataDiv>
          </div>
          <div style={{ marginTop: "2.75rem" }}>
            <s.TitleContentDiv>완료된 정산</s.TitleContentDiv>
            <GrayMyReqDataDiv></GrayMyReqDataDiv>
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
            {menuArr.map((el, index) => (
              <li
                className={index === tabIndex ? "submenu focused" : "submenu"}
                onClick={() => selectMenuHandler(index)}
              >
                {el.name}
              </li>
            ))}
          </s.TabMenu>
        </>
      )}
    </>
  );
};

export default MyRequestPayPage;
