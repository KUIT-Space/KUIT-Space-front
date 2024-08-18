import TopBarText, { LeftEnum } from "@/components/TopBarText";
import * as s from "@/pages/PayPage/PayPage.styled";
import Kookmin from "@/assets/PayPage/test_bank.svg";
import { BottomBtn } from "@/components/BottomBtn";
import { useEffect, useState } from "react";
import CompletePay from "@/pages/PayPage/CompletePay";
import CompleteCreatePay from "@/pages/PayPage/CompleteCreatePay";
import CheckBox from "@/components/CheckBox";
import { Member } from "@/pages/ChatPage/ChatCreatePage/ChatCreatePage.styled";
import ReactImg from "@/assets/react.svg";
import { PayChatDiv } from "@/pages/PayPage/CreatePayComponents";
import SearchIcon from "@/assets/PayPage/search_icon.svg";
import { getAllChatMemberApi, getAllMemberApi, recentAccountApi } from "@/apis/Pay/PayPageAPI";
import { SpaceSearchUserProfile, chatroomSearchAllApi } from "@/apis";
import { UserInfoInSpace } from "@/apis/SpaceSearchAllUserApi";
import { getUserDefaultImageURL } from "@/utils/getUserDefaultImageURL";
import { UserInfo, userInfo } from "os";

type payUserInfo = {
  userAuth: string;
  userName: string;
  userProfileImg: string;
  userProfileMsg: string;
};
export type ChatUserInfoInSpace = {
  chatRoomId: number;
  chatRoomName: string;
  imgUrl: string;
  userList: UserInfoInSpace[] | null;
};

const RecentAccountDiv = ({ data }: { data: BankInfo }) => {
  return (
    <s.RowFlexDiv style={{ margin: "0.25rem" }}>
      <img style={{ marginRight: "0.75rem" }} src={Kookmin}></img>
      <s.ColumnFlexDiv>
        <s.GrayTextDiv>{data.bankName}</s.GrayTextDiv>
        <s.RegularText>{data.bankAccountNum}</s.RegularText>
      </s.ColumnFlexDiv>
    </s.RowFlexDiv>
  );
};

export type BankInfo = {
  bankName: String;
  bankAccountNum: String;
};
type NextPageType = {
  nextPage: Function;
  checkUsers: Set<number>;
};

const CreateRequestPage1 = ({ nextPage }: NextPageType) => {
  const [bankData, setBankData] = useState<BankInfo[] | undefined>([]);
  useEffect(() => {
    recentAccountApi(3, setBankData);
  }, []);
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
            {bankData?.length === 0 ? (
              <s.NoAlertDiv>최근에 정산받은 계좌가 없어요!</s.NoAlertDiv>
            ) : (
              <>
                {bankData?.map((value, index) => {
                  return <RecentAccountDiv key={index} data={value}></RecentAccountDiv>;
                })}
              </>
            )}
          </s.RoundDiv>
        </div>
      </s.ContainerDiv>
      <BottomBtn onClick={() => nextPage()}>다음으로</BottomBtn>
    </>
  );
};
const CreateRequestPage2 = ({
  nextPage,
  forceRefresh,
  setCheckUsers,
  checkUsers,
}: {
  nextPage: Function;
  forceRefresh: Function;
  setCheckUsers: React.Dispatch<React.SetStateAction<Set<number>>>;
  checkUsers: Set<number>;
}) => {
  const [tabIndex, setTabIndex] = useState(0);
  const [search, setSearch] = useState("");
  const [userInfoData, setUserInfoData] = useState<UserInfoInSpace[] | undefined>([]);
  const [chatUserInfoData, setChatUserInfoData] = useState<ChatUserInfoInSpace[] | undefined>([]);

  useEffect(() => {
    selectMenuHandler(tabIndex);
    forceRefresh(1);
  }, [chatUserInfoData]);

  useEffect(() => {
    // const id = localStorage.getItem("SpaceId");
    const id = "3";
    if (id !== null) {
      const _id = Number.parseInt(id);
      getAllMemberApi(_id, setUserInfoData);
      getAllChatMemberApi(_id, setChatUserInfoData);
    }
  }, []);
  const onKeywordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const selectMenuHandler = (index: number) => {
    setTabIndex(index);
  };

  const checkUserHandler = (id: number) => {
    const _checkUsers = new Set(checkUsers);

    if (_checkUsers.has(id)) {
      _checkUsers.delete(id);
      setCheckUsers(_checkUsers);
    } else {
      _checkUsers.add(id);
      setCheckUsers(_checkUsers);
      // console.log(checkUsers);
    }
  };
  const menuArr = [
    { name: "채팅방", content: "Tab menu ONE" },
    { name: "멤버", content: "Tab menu TWO" },
  ];

  return (
    <>
      <TopBarText left={LeftEnum.Back} center="" right=""></TopBarText>
      <s.ContainerDiv>
        <div style={{ margin: "2rem 0rem 2rem 0rem" }}>
          <s.NowPriceDiv>정산할 멤버를 선택해주세요</s.NowPriceDiv>
        </div>

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
        {tabIndex == 0 ? (
          <div>
            {chatUserInfoData !== undefined ? (
              <>
                {chatUserInfoData.map((value, index) => (
                  <PayChatDiv key={index} props={value}></PayChatDiv>
                ))}
              </>
            ) : (
              <></>
            )}
          </div>
        ) : (
          <s.ColumnFlexDiv style={{ width: "100%" }}>
            <s.SearchBarDiv>
              <s.SearchIconImg src={SearchIcon}></s.SearchIconImg>
              <s.SearchBar type="text" value={search} onChange={onKeywordChange}></s.SearchBar>
            </s.SearchBarDiv>
            {userInfoData !== undefined ? (
              <>
                {userInfoData
                  ?.filter((val) => {
                    if (search == "") {
                      return val;
                    } else if (val.userName.toLowerCase().includes(search.toLowerCase())) {
                      return val;
                    }
                  })
                  .map((value) => {
                    return (
                      <Member key={value.userId}>
                        <section>
                          <img
                            src={
                              value.profileImgUrl
                                ? value.profileImgUrl
                                : getUserDefaultImageURL(value.userId)
                            }
                          />
                          <span className="name">{value.userName}</span>
                        </section>
                        <CheckBox
                          onClick={() => {
                            checkUserHandler(value.userId);
                          }}
                        ></CheckBox>
                      </Member>
                    );
                  })}
              </>
            ) : (
              <></>
            )}
          </s.ColumnFlexDiv>
        )}
      </s.ContainerDiv>
      <BottomBtn onClick={() => nextPage()}>{checkUsers.size}명 선택</BottomBtn>
    </>
  );
};

const CreateRequestPage3 = ({ nextPage, checkUsers }: NextPageType) => {
  const [tabIndex, setTabIndex] = useState(0);
  const menuArr = [
    { name: "1/N 분배", content: "Tab menu ONE" },
    { name: "직접 입력", content: "Tab menu TWO" },
  ];

  const selectMenuHandler = (index: number) => {
    setTabIndex(index);
  };
  const _tempArr = new Map<number, payUserInfo>();
  useEffect(() => {
    console.log("ddddd");
    console.log(checkUsers);
    if (checkUsers?.size > 0) {
      for (let value of checkUsers) {
        const response = SpaceSearchUserProfile(3, value).then((res) => {
          if (res?.result !== undefined) {
            _tempArr.set(value, res.result);
          }
        });
      }
    }
  }, []);
  return (
    <>
      <TopBarText left={LeftEnum.Back} center="" right=""></TopBarText>
      <s.ContainerDiv>
        <s.TabMenu>
          {menuArr.map((value, index) => (
            <li
              key={index}
              className={index === tabIndex ? "submenu focused" : "submenu"}
              onClick={() => {
                selectMenuHandler(index);
              }}
            >
              {value.name}
            </li>
          ))}
        </s.TabMenu>
        {tabIndex == 0 ? (
          <div style={{ margin: "1.25rem" }}>
            <s.PriceInput type="number" placeholder="정산할 금액을 입력해주세요"></s.PriceInput>
            <div>{}</div>
          </div>
        ) : (
          // {_tempArr}
          // {_tempArr.map((value) => {
          //           return (
          //             <Member key={value.userId}>
          //               <section>
          //                 <img
          //                   src={
          //                     value.profileImgUrl
          //                       ? value.profileImgUrl
          //                       : getUserDefaultImageURL(value.userId)
          //                   }
          //                 />
          //                 <span className="name">{value.userName}</span>
          //               </section>
          //               <CheckBox
          //                 onClick={() => {
          //                   checkUserHandler(value.userId);
          //                 }}
          //               ></CheckBox>
          //             </Member>
          //           );
          //         })}
          <></>
        )}
      </s.ContainerDiv>
      <BottomBtn onClick={() => nextPage()}>정산요청</BottomBtn>
    </>
  );
};
const CreateRequestPage4 = ({ nextPage }: NextPageType) => {
  return (
    <>
      <TopBarText left={LeftEnum.Back} center="" right=""></TopBarText>
      <s.ContainerDiv>
        <s.NowPriceDiv>이렇게 정산을 요청할까요?</s.NowPriceDiv>
        <s.GrayRoundDiv>
          <s.RowFlexDiv style={{ margin: "0.75rem 0rem 0.75rem 0rem", alignItems: "center" }}>
            <div>정산 총 금액</div>
            <s.NowPriceDiv style={{ marginLeft: "auto" }}> 20000원</s.NowPriceDiv>
          </s.RowFlexDiv>
          <hr style={{ border: "0.0625rem solid var(--GRAY-700, #45454B)" }}></hr>
          <Member>
            <section>
              <img src={ReactImg} />
              <span className="name">dd</span>
            </section>
            <div>4,000</div>
          </Member>
          <Member>
            <section>
              <img src={ReactImg} />
              <span className="name">dd</span>
            </section>
            <div>4,000</div>
          </Member>
          <Member>
            <section>
              <img src={ReactImg} />
              <span className="name">dd</span>
            </section>
            <div>4,000</div>
          </Member>
        </s.GrayRoundDiv>
      </s.ContainerDiv>
      <BottomBtn onClick={() => nextPage()}>정산요청</BottomBtn>
    </>
  );
};
const CreateRequestPage = () => {
  const [page, setPage] = useState(0);
  const [refresh, setRefresh] = useState(0);
  const [checkUsers, setCheckUsers] = useState(new Set<number>());
  const forceRefresh = () => {
    setRefresh(refresh + 1);
  };
  const nextPage = () => {
    setPage(page + 1);
  };
  const resetPage = () => {
    //일단 만들어 둠
    setPage(0);
  };

  useEffect(() => {
    console.log(checkUsers);
  }, [checkUsers]);
  switch (page) {
    case 0:
      return <CreateRequestPage1 nextPage={nextPage}></CreateRequestPage1>;
    case 1:
      return (
        <CreateRequestPage2
          nextPage={nextPage}
          forceRefresh={forceRefresh}
          checkUsers={checkUsers}
          setCheckUsers={setCheckUsers}
        ></CreateRequestPage2>
      );
    case 2:
      return <CreateRequestPage3 nextPage={nextPage} checkUsers={checkUsers}></CreateRequestPage3>;
    case 3:
      return <CreateRequestPage4 nextPage={nextPage}></CreateRequestPage4>;
    case 4:
      return <CompleteCreatePay></CompleteCreatePay>;
  }
};

export default CreateRequestPage;
