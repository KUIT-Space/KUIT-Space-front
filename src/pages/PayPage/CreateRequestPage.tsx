import TopBarText, { LeftEnum } from "@/components/TopBarText";
import * as s from "@/pages/PayPage/PayPage.styled";

const CreateRequestPage = () => {
  return (
    <>
      <TopBarText left={LeftEnum.Back} center="" right=""></TopBarText>
      <div style={{ margin: "2rem 0rem 0rem 1.25rem" }}>
        <s.NowPriceDiv>정산받을 계좌를 입력해주세요</s.NowPriceDiv>
        <s.GrayRoundDiv>dd</s.GrayRoundDiv>
        <s.GrayRoundDiv>dd</s.GrayRoundDiv>
      </div>
    </>
  );
};

export default CreateRequestPage;
