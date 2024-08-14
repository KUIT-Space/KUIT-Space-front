import TopBarText, { LeftEnum } from "@/components/TopBarText";
import * as s from "@/pages/PayPage/PayPage.styled";
import reactIcon from "@/assets/react.svg";
import { NormalBtn } from "./NormalBtn";
import { GrayBtn } from "./GrayBtn";
import ReqDataDiv from "./ReqDataDiv";
import { ToastContainer } from "react-toastify";
import { Transform } from "stream";
import { useEffect, useState } from "react";
import { payReceiveApi } from "@/apis/Pay/PayPageAPI";
import { PayReceiveInfo } from "./PayPage";
import CompleteReqDataDiv from "./CompleteReqDataDiv";

const RequestedPayPage = () => {
  const [currentData, setCurrentData] = useState<PayReceiveInfo[] | undefined>([]);
  const [completeData, setCompleteData] = useState<PayReceiveInfo[] | undefined>([]);
  useEffect(() => {
    payReceiveApi(3, setCurrentData, setCompleteData);
  }, []);
  return (
    <>
      <TopBarText left={LeftEnum.Back} center="요청받은 정산" right=""></TopBarText>
      <s.ContainerDiv>
        <s.TitleContentDiv>진행 중인 정산</s.TitleContentDiv>
        {currentData?.map((value) => {
          return <ReqDataDiv key={value.payRequestTargetId} data={value}></ReqDataDiv>;
        })}
        <s.TitleContentDiv>완료된 정산</s.TitleContentDiv>
        {currentData?.map((value) => {
          return (
            <CompleteReqDataDiv key={value.payRequestTargetId} data={value}></CompleteReqDataDiv>
          );
        })}
        <ToastContainer
          style={{ width: "50%", left: "50%", transform: "translateX(-50%)" }}
          position="top-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </s.ContainerDiv>
    </>
  );
};

export default RequestedPayPage;
