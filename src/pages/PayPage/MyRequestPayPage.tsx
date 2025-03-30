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
  const navigator = useNavigate();
  const { data } = usePayRequestListQuery(SPACE_ID);
  if (data.result == undefined) {
    // TODO 에러 발생
    return <></>;
  }
  const currentData = data.result.inCompletePayRequestList;
  const completeData = data.result.completePayRequestList;

  const redirectDetailPage = (index: number) => {
    navigator(`/requestingpay/${index}`);
  };
  return (
    <>
      <TopBarText left={LeftEnum.Back} center="내가 요청한 정산" right=""></TopBarText>
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
    </>
  );
};

export default MyRequestPayPage;
