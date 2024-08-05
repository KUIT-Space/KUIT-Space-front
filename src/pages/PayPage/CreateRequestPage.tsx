import TopBarText, { LeftEnum } from "@/components/TopBarText";
import * as s from "@/pages/PayPage/PayPage.styled";
import Kookmin from "@/assets/PayPage/test_bank.svg";
import { BottomBtn } from "@/components/BottomBtn";
import { useState } from "react";
import CompletePay from "./CompletePay";
import CompleteCreatePay from "./CompleteCreatePay";
import CheckBox from "@/components/CheckBox";
import { Member } from "../ChatPage/ChatCreatePage/ChatCreatePage.styled";
import ReactImg from "@/assets/react.svg";
import { PayChatDiv } from "./CreatePayComponents";

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

type NextPageType = {
  nextPage: Function;
};
const CreateRequestPage1 = ({ nextPage }: NextPageType) => {
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
      <BottomBtn onClick={() => nextPage()}>다음으로</BottomBtn>
    </>
  );
};
const CreateRequestPage2 = ({ nextPage }: NextPageType) => {
  const [tabIndex, setTabIndex] = useState(0);

  const selectMenuHandler = (index: number) => {
    setTabIndex(index);
  };
  const menuArr = [
    { name: "미정산", content: "Tab menu ONE" },
    { name: "정산완료", content: "Tab menu TWO" },
  ];
  const dataArr = [
    { image: "aa", name: "박규환", amount: "15000원", chk: true },
    { image: "aa", name: "박규환", amount: "15000원", chk: true },
  ];
  const chatroomArr = [
    { img: "aa", name: "GreenJoa 방", cnt: 37 },
    { img: "aa", name: "작업 안 하면 죽는 방", cnt: 24 },
  ];

  return (
    <>
      <TopBarText left={LeftEnum.Back} center="" right=""></TopBarText>
      <s.ContainerDiv>
        <s.NowPriceDiv>정산할 멤버를 선택해주세요</s.NowPriceDiv>
        <s.TabMenu>
          {menuArr.map((value, index) => (
            <li
              className={index === tabIndex ? "submenu focused" : "submenu"}
              onClick={() => selectMenuHandler(index)}
            >
              {value.name}
            </li>
          ))}
        </s.TabMenu>
        <div>
          {chatroomArr.map((value, index) => (
            <PayChatDiv img={value.img} name={value.name} cnt={value.cnt}></PayChatDiv>
          ))}
        </div>
      </s.ContainerDiv>
      <BottomBtn onClick={() => nextPage()}>다음으로</BottomBtn>
    </>
  );
};

const CreateRequestPage3 = ({ nextPage }: NextPageType) => {
  return (
    <>
      <TopBarText left={LeftEnum.Back} center="" right=""></TopBarText>
      <s.ContainerDiv>
        <s.NowPriceDiv>정산할 멤버를 선택해주세요</s.NowPriceDiv>
      </s.ContainerDiv>
      <BottomBtn onClick={() => nextPage()}>다음으로</BottomBtn>
    </>
  );
};
const CreateRequestPage = () => {
  const [page, setPage] = useState(0);
  const nextPage = () => {
    setPage(page + 1);
    console.log(page);
  };
  const resetPage = () => {
    //일단 만들어 둠
    setPage(0);
  };
  switch (page) {
    case 0:
      return <CreateRequestPage1 nextPage={nextPage}></CreateRequestPage1>;
    case 1:
      return <CreateRequestPage2 nextPage={nextPage}></CreateRequestPage2>;
    case 2:
      return <CreateRequestPage3 nextPage={nextPage}></CreateRequestPage3>;
    case 3:
      return <CompleteCreatePay></CompleteCreatePay>;
  }
};

export default CreateRequestPage;
