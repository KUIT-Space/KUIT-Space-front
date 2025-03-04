import TopBarText, { LeftEnum } from "@/components/TopBarText";
import * as s from "./QRPage.styled";
const QRDetail = () => {
  return (
    <>
      <TopBarText left={LeftEnum.Back} center="세션 이름 출석" right={<></>} />
      <s.QRImgContainer>
        <img></img>
        <img></img>
      </s.QRImgContainer>
      <s.QRAttendListDiv>
        <s.QRAttendListContainer>
          <div>1</div>
          <div>1</div>
          <div>1</div>
        </s.QRAttendListContainer>
      </s.QRAttendListDiv>
    </>
  );
};
