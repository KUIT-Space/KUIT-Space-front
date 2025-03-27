import { ToastContainer } from "react-toastify";

import { useRequestedPayListQuery } from "@/apis/Pay";
import TopBarText, { LeftEnum } from "@/components/TopBarText";
import CompleteReqDataDiv from "@/pages/PayPage/CompleteReqDataDiv";
import * as s from "@/pages/PayPage/PayPage.styled";
import ReqDataDiv from "@/pages/PayPage/ReqDataDiv";
import { SPACE_ID } from "@/utils/constants";

const RequestedPayPage = () => {
  const { data } = useRequestedPayListQuery(SPACE_ID);
  const currentData = data.result?.inCompleteRequestedPayList;
  const completeData = data.result?.completeRequestedPayList;
  return (
    <>
      <TopBarText left={LeftEnum.Back} center="요청받은 정산" right=""></TopBarText>
      <s.ContainerDiv>
        <s.TitleContentDiv>진행 중인 정산</s.TitleContentDiv>
        {currentData?.length == 0 ? (
          <s.NoAlertDiv>요청한 정산이 없어요!</s.NoAlertDiv>
        ) : (
          <div>
            {currentData?.map((value) => {
              return <ReqDataDiv key={value.payRequestTargetId} data={value}></ReqDataDiv>;
            })}
          </div>
        )}

        <s.TitleContentDiv>완료된 정산</s.TitleContentDiv>
        {completeData?.length == 0 ? (
          <s.NoAlertDiv>요청한 정산이 없어요!</s.NoAlertDiv>
        ) : (
          <div>
            {completeData?.map((value) => {
              return (
                <CompleteReqDataDiv
                  key={value.payRequestTargetId}
                  data={value}
                ></CompleteReqDataDiv>
              );
            })}
          </div>
        )}

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
