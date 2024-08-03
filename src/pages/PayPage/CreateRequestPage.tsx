import TopBarText, { LeftEnum } from "@/components/TopBarText";
import * as s from "@/pages/PayPage/PayPage.styled";
import Kookmin from "@/assets/PayPage/test_bank.svg";

const RecentAccountDiv = () => {
  return (
    <s.RowFlexDiv style={{ margin: "0.25rem" }}>
      <img style={{ marginRight: "0.75rem" }} src={Kookmin}></img>
      <s.ColumnFlexDiv>
        <s.GrayTextDiv>국민은행</s.GrayTextDiv>
        <s.RegularText>123-1234-12345</s.RegularText>
      </s.ColumnFlexDiv>
    </s.RowFlexDiv>
  );
};
const CreateRequestPage = () => {
  return (
    <>
      <TopBarText left={LeftEnum.Back} center="" right=""></TopBarText>
      <s.ContainerDiv>
        <div style={{ margin: "2rem 0rem 2rem 0rem" }}>
          <s.NowPriceDiv>정산받을 계좌를 입력해주세요</s.NowPriceDiv>
        </div>
        <div style={{ margin: "2rem 0rem 3rem 0rem" }}>
          <s.InputText placeholder="계좌번호"></s.InputText>
          <s.BankSelect>
            <s.BankOption disabled hidden selected>
              은행 선택
            </s.BankOption>
            <s.BankOption value="kookmin">국민은행</s.BankOption>
            <s.BankOption value="shinhan">신한은행</s.BankOption>
          </s.BankSelect>
        </div>
        <div style={{ margin: "2rem 0rem 2rem 0rem" }}>
          <s.RegularText>최근 정산받은 계좌</s.RegularText>
          <s.RoundDiv>
            <RecentAccountDiv></RecentAccountDiv>
          </s.RoundDiv>
        </div>
      </s.ContainerDiv>
    </>
  );
};

export default CreateRequestPage;
