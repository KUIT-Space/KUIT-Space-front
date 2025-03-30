import { usePayDetailQuery } from "@/apis/Pay";
import TopBarText, { LeftEnum } from "@/components/TopBarText";
import * as s from "@/pages/PayPage/PayPage.styled";
import { SPACE_ID } from "@/utils/constants";
import { useState } from "react";
import { useParams } from "react-router";
import PayResult from "./PayResult";
import { addComma } from "./PayPage";

const MyRequestPayDetailPage = () => {
  const { id } = useParams();
  const [tabIndex, setTabIndex] = useState(0);
  const menuArr = [
    { name: "미정산", content: "Tab menu ONE" },
    { name: "정산완료", content: "Tab menu TWO" },
  ];
  const selectMenuHandler = (index: number) => {
    setTabIndex(index);
  };
  const detail = usePayDetailQuery(SPACE_ID, Number(id));
  const detailData = detail?.data.result;

  const completeTargetList = detailData?.responseOfTargetDetails.filter(
    (value) => value.complete === true,
  );

  const inCompleteTargetList = detailData?.responseOfTargetDetails.filter(
    (value) => value.complete === false,
  );

  console.log(completeTargetList);
  console.log(inCompleteTargetList);

  return (
    <>
      <TopBarText left={LeftEnum.Back} center="내가 요청한 정산" right=""></TopBarText>
      {
        <>
          <s.CompletePayDiv style={{ padding: "2.5rem 1rem 0.75rem 1rem", margin: "0.75rem" }}>
            <s.TextDiv style={{ marginBottom: "0.5rem" }}>정산 완료된 금액</s.TextDiv>
            <s.RowFlexDiv style={{ alignItems: "end", marginBottom: "1.75rem" }}>
              <s.NowPriceDiv>
                {detailData?.receivedAmount === undefined
                  ? "NAN"
                  : addComma(detailData?.receivedAmount)}
                원 &nbsp;
              </s.NowPriceDiv>
              <s.AllPriceDiv>
                /{" "}
                {detailData?.totalAmount === undefined ? "NAN" : addComma(detailData?.totalAmount)}
                원
              </s.AllPriceDiv>
            </s.RowFlexDiv>
            {/* TODO date */}
            <s.GrayTextDiv>요청 날짜 {detailData?.createdDate}</s.GrayTextDiv>
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
              {completeTargetList === undefined || completeTargetList[0] === undefined ? (
                <>
                  <s.NoAlertDiv>정산완료 된 유저가 없어요!</s.NoAlertDiv>
                </>
              ) : (
                <>
                  {completeTargetList.map((value, index) =>
                    value !== undefined ? <PayResult key={index} props={value} /> : <></>,
                  )}
                </>
              )}
            </s.RoundDiv>
          ) : (
            <s.RoundDiv style={{ margin: "0.75rem 1.25rem 0.75rem 1.25rem" }}>
              {inCompleteTargetList === undefined || inCompleteTargetList[0] === undefined ? (
                <>
                  <s.NoAlertDiv>미정산 된 유저가 없어요!</s.NoAlertDiv>
                </>
              ) : (
                <>
                  {inCompleteTargetList.map((value, index) =>
                    value !== undefined ? <PayResult key={index} props={value} /> : <></>,
                  )}
                </>
              )}
            </s.RoundDiv>
          )}
        </>
      }
    </>
  );
};

export default MyRequestPayDetailPage;
