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
import {
  getAllChatMemberApi,
  getAllMemberApi,
  payCreateApi,
  recentAccountApi,
  targetInfoList,
} from "@/apis/Pay/PayPageAPI";
import { SpaceSearchUserProfile, UserProfileResult, chatroomSearchAllApi } from "@/apis";
import { UserInfoInSpace } from "@/apis/Space/SpaceSearchAllUserApi";
import { getUserDefaultImageURL } from "@/utils/getUserDefaultImageURL";
import { UserInfo, userInfo } from "os";
import { addComma } from "./PayPage";
import { ProgressBar } from "react-toastify/dist/components";

type payUserInfo = {
  name: number;
  value: number;
};

export type ChatUserInfoInSpace = {
  chatRoomId: number;
  chatRoomName: string;
  imgUrl: string;
  userList: UserInfoInSpace[] | null;
};

export type BankInfo = {
  bankName: String;
  bankAccountNum: String;
};
type NextPageType = {
  nextPage: Function;
  setAccount?: Function;
  checkUsers?: Set<number>;
};

const idToPrice = new Map<number, number>();
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

const CreateRequestPage1 = ({
  nextPage,
  setAccount,
  setBankName,
}: {
  nextPage: Function;
  setAccount: React.Dispatch<React.SetStateAction<string>>;
  setBankName: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const [bankData, setBankData] = useState<BankInfo[] | undefined>([]);
  const [bankValue, setBankValue] = useState("");
  const [acc, setAcc] = useState("");
  useEffect(() => {
    recentAccountApi(3, setBankData);
  }, []);
  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAcc(e.target.value);
  };

  const onChangeOption = (e: any) => {
    setBankValue(e.target.value);
    console.log(e.target.value);
  };
  return (
    <>
      <TopBarText left={LeftEnum.Back} center="" right=""></TopBarText>
      <s.ContainerDiv>
        <div style={{ margin: "2rem 0rem 2rem 0rem" }}>
          <s.NowPriceDiv>정산받을 계좌를 입력해주세요</s.NowPriceDiv>
        </div>
        <div style={{ margin: "2rem 0rem 3rem 0rem" }}>
          <s.InputText placeholder="계좌번호" value={acc} onChange={onChangeHandler}></s.InputText>
          <s.BankSelect onChange={onChangeOption} value={bankValue}>
            <s.BankOption disabled hidden selected>
              은행 선택
            </s.BankOption>
            <s.BankOption value="국민은행">국민은행</s.BankOption>
            <s.BankOption value="신한은행">신한은행</s.BankOption>
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
      <BottomBtn
        onClick={() => {
          setAccount(acc);
          setBankName(bankValue);
          nextPage();
        }}
      >
        다음으로
      </BottomBtn>
    </>
  );
};
const CreateRequestPage2 = ({
  nextPage,
  forceRefresh,
  setCheckUsers,
  checkUsers,
  userInfoData,
  setUserInfoData,
}: {
  nextPage: Function;
  forceRefresh: Function;
  setCheckUsers: React.Dispatch<React.SetStateAction<Set<number>>>;
  checkUsers: Set<number>;
  userInfoData: UserInfoInSpace[] | undefined;
  setUserInfoData: React.Dispatch<React.SetStateAction<UserInfoInSpace[] | undefined>>;
}) => {
  const [tabIndex, setTabIndex] = useState(0);
  const [search, setSearch] = useState("");
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

const CreateRequestPage3 = ({
  nextPage,
  checkUsers,
  setTotalPrice,
}: {
  nextPage: Function;
  checkUsers: Set<number>;
  setTotalPrice: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const [tabIndex, setTabIndex] = useState(0);
  const [nPrice, setNPrice] = useState<number>();
  const [_totalPrice, _setTotalPrice] = useState<number>(0);

  const menuArr = [
    { name: "1/N 분배", content: "Tab menu ONE" },
    { name: "직접 입력", content: "Tab menu TWO" },
  ];

  const selectMenuHandler = (index: number) => {
    setTabIndex(index);
  };
  const changePriceHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const price = Number.parseInt(e.target.value);
    setNPrice(price);
  };
  const [tempArr, setTempArr] = useState<UserProfileResult[]>([]);

  const selfChangePriceHandler = (id: number, e: React.ChangeEvent<HTMLInputElement>) => {
    let sum = 0;

    const price = Number.parseInt(e.target.value);
    idToPrice?.set(id, price);

    for (const value of idToPrice.values()) {
      sum = sum + value;
    }

    console.log(idToPrice);
    _setTotalPrice(sum);
  };

  const nPriceHandler = () => {
    if (nPrice !== undefined) {
      tempArr.forEach((value) => {
        idToPrice?.set(value.userId!, nPrice / tempArr.length);
      });
    } else {
      alert("에러!");
    }
    console.log(idToPrice);
  };
  useEffect(() => {
    let _tempArr: UserProfileResult[] = [];
    if (checkUsers !== undefined) {
      if (checkUsers?.size > 0) {
        for (let value of checkUsers) {
          const response = SpaceSearchUserProfile(3, value).then((res) => {
            if (res?.result !== undefined) {
              const _tempObj = res.result;
              _tempObj.userId = value;
              _tempArr.push(_tempObj);
            }
          });
        }
        setTempArr(_tempArr);
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
            <s.PriceInput
              type="number"
              placeholder="정산할 금액을 입력해주세요"
              value={nPrice}
              onChange={changePriceHandler}
            ></s.PriceInput>
            <div style={{ marginTop: "1.5rem" }}>
              {tempArr.map((value, index) => {
                return (
                  <Member key={value.userId}>
                    <section>
                      <img
                        src={
                          value.userProfileImg
                            ? value.userProfileImg
                            : getUserDefaultImageURL(value.userId!)
                        }
                      />
                      <span className="name">{value.userName}</span>
                    </section>
                    <s.RowFlexDiv>
                      <s.NormalTextDiv>
                        {" "}
                        {nPrice !== undefined ? nPrice / tempArr.length : "NaN"}
                      </s.NormalTextDiv>
                      <s.TextDiv>원</s.TextDiv>
                    </s.RowFlexDiv>
                  </Member>
                );
              })}
            </div>
          </div>
        ) : (
          <div style={{ margin: "1.25rem" }}>
            <div style={{ marginTop: "1.5rem" }}>
              {tempArr.map((value, index) => {
                return (
                  <Member key={value.userId}>
                    <section>
                      <img
                        src={
                          value.userProfileImg
                            ? value.userProfileImg
                            : getUserDefaultImageURL(value.userId!)
                        }
                      />
                      <span className="name">{value.userName}</span>
                    </section>
                    <s.RowFlexDiv>
                      <s.PriceInput2
                        placeholder="금액입력"
                        value={idToPrice?.get(value.userId!)}
                        onChange={(e) => {
                          selfChangePriceHandler(value.userId!, e);
                        }}
                      ></s.PriceInput2>
                    </s.RowFlexDiv>
                  </Member>
                );
              })}
            </div>
            <hr></hr>
            <s.RowFlexDiv style={{ justifyContent: "right", marginTop: "1rem" }}>
              <s.NowPriceDiv>{_totalPrice} &nbsp;</s.NowPriceDiv>
              <s.GrayBTextDiv>원</s.GrayBTextDiv>
            </s.RowFlexDiv>
          </div>
        )}
      </s.ContainerDiv>
      <BottomBtn
        onClick={() => {
          if (tabIndex === 0) {
            nPriceHandler();
            if (nPrice !== undefined) {
              setTotalPrice(nPrice);
            }
          } else {
            setTotalPrice(_totalPrice);
          }
          nextPage();
        }}
      >
        정산요청
      </BottomBtn>
    </>
  );
};
const CreateRequestPage4 = ({
  nextPage,
  userInfoData,
  totalPrice,
  array,
  setArray,
}: {
  nextPage: Function;
  userInfoData: UserInfoInSpace[] | undefined;
  totalPrice: number;
  array: targetInfoList[];
  setArray: React.Dispatch<React.SetStateAction<targetInfoList[]>>;
}) => {
  useEffect(() => {
    setArray(
      [...idToPrice!].map(([targetUserId, requestAmount]) => ({ targetUserId, requestAmount })),
    );
  }, []);
  const price = addComma(totalPrice);
  return (
    <>
      <TopBarText left={LeftEnum.Back} center="" right=""></TopBarText>
      <s.ContainerDiv>
        <s.NowPriceDiv>이렇게 정산을 요청할까요?</s.NowPriceDiv>
        <s.GrayRoundDiv>
          <s.RowFlexDiv style={{ margin: "0.75rem 0rem 0.75rem 0rem", alignItems: "center" }}>
            <div>정산 총 금액</div>
            <s.NowPriceDiv style={{ marginLeft: "auto" }}> {price}&nbsp;원</s.NowPriceDiv>
          </s.RowFlexDiv>
          <hr style={{ border: "0.0625rem solid var(--GRAY-700, #45454B)" }}></hr>
          {array.map((value, key) => {
            const _userData = userInfoData?.find((i) => i.userId === value.targetUserId);
            const _price = addComma(value.requestAmount);
            return (
              <Member key={value.targetUserId}>
                <section>
                  <img
                    src={
                      _userData?.profileImgUrl
                        ? _userData?.profileImgUrl
                        : getUserDefaultImageURL(_userData!.userId)
                    }
                  />
                  <span className="name">{_userData?.userName}</span>
                </section>
                <div>{_price}&nbsp;원</div>
              </Member>
            );
          })}
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
  const [bankAccount, setBankAccount] = useState("");
  const [bankName, setBankName] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const [userInfoData, setUserInfoData] = useState<UserInfoInSpace[] | undefined>([]);
  const [isComplete, setIsComplete] = useState(false);
  const [array, setArray] = useState<targetInfoList[]>([]);

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
    if (page === 4) {
      payCreateApi(totalPrice, bankName, bankAccount, array, 3).then(() => {
        setIsComplete(true);
      });
    }
  }, [page]);
  switch (page) {
    case 0:
      return (
        <CreateRequestPage1
          nextPage={nextPage}
          setAccount={setBankAccount}
          setBankName={setBankName}
        ></CreateRequestPage1>
      );
    case 1:
      return (
        <CreateRequestPage2
          nextPage={nextPage}
          forceRefresh={forceRefresh}
          checkUsers={checkUsers}
          setCheckUsers={setCheckUsers}
          userInfoData={userInfoData}
          setUserInfoData={setUserInfoData}
        ></CreateRequestPage2>
      );
    case 2:
      return (
        <CreateRequestPage3
          nextPage={nextPage}
          checkUsers={checkUsers}
          setTotalPrice={setTotalPrice}
        ></CreateRequestPage3>
      );
    case 3:
      console.log(userInfoData);
      return (
        <CreateRequestPage4
          totalPrice={totalPrice}
          nextPage={nextPage}
          userInfoData={userInfoData}
          array={array}
          setArray={setArray}
        ></CreateRequestPage4>
      );
    case 4:
      if (isComplete) {
        return <CompleteCreatePay></CompleteCreatePay>;
      } else {
        return <div>진행 중</div>;
      }
  }
};

export default CreateRequestPage;
