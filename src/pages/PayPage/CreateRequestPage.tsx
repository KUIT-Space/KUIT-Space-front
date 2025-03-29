import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { SpaceSearchUserProfile, UserProfileResult } from "@/apis";
import {
  BankInfo,
  RequestOfCreatePay,
  TargetOfPayRequest,
  useBankInfoQuery,
  useCreatePay,
} from "@/apis/Pay";
import { getAllChatMemberApi, getAllMemberApi, targetInfoList } from "@/apis/Pay/PayPageAPI";
import { UserInfoInSpace } from "@/apis/Space/SpaceSearchAllUserApi";
import SearchIcon from "@/assets/PayPage/search_icon.svg";
import Kookmin from "@/assets/PayPage/test_bank.svg";
import { BottomBtn } from "@/components/BottomBtn";
import CheckBox from "@/components/CheckBox";
import TopBarText, { LeftEnum } from "@/components/TopBarText";
import { Member } from "@/pages/ChatPage/ChatCreatePage/ChatCreatePage.styled";
import CompleteCreatePay from "@/pages/PayPage/CompleteCreatePay";
import { PayChatDiv } from "@/pages/PayPage/CreatePayComponents";
import * as s from "@/pages/PayPage/PayPage.styled";
import { SPACE_ID } from "@/utils/constants";
import { getUserDefaultImageURL } from "@/utils/getUserDefaultImageURL";

import { addComma } from "./PayPage";
import { spaceMemberKeys } from "@/apis/SpaceMember";
import { useAllMembersQuery } from "@/apis/SpaceMember";
import { SpaceMemberDetail } from "@/apis/SpaceMember";
import { check } from "prettier";
import { getEvent, useEventsQuery } from "@/apis/event";

// type payUserInfo = {
//   name: number;
//   value: number;
// };

export type ChatUserInfoInSpace = {
  chatRoomId: number;
  chatRoomName: string;
  imgUrl: string;
  userList: UserInfoInSpace[] | null;
};

// type NextPageType = {
//   nextPage: () => void;
//   setAccount?: () => void;
//   checkUsers?: Set<number>;
// };

const idToPrice = new Map<number, number>();
const RecentAccountDiv = ({ data }: { data: BankInfo }) => {
  return (
    <s.RowFlexDiv style={{ margin: "0.25rem" }}>
      <img style={{ marginRight: "0.75rem" }} src={Kookmin} alt="kookmin 은행" />
      <s.ColumnFlexDiv>
        <s.GrayTextDiv>{data.bankName}</s.GrayTextDiv>
        <s.RegularText>{data.bankAccountNumber}</s.RegularText>
      </s.ColumnFlexDiv>
    </s.RowFlexDiv>
  );
};

const CreateRequestPage1 = ({
  nextPage,
  setAccount,
  setBankName,
}: {
  nextPage: () => void;
  setAccount: React.Dispatch<React.SetStateAction<string>>;
  setBankName: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const { data } = useBankInfoQuery(SPACE_ID);

  // const [bankData, setBankData] = useState<BankInfo[] | undefined>([]);
  const [bankValue, setBankValue] = useState("국민은행");
  const [acc, setAcc] = useState("");
  const bankData = data.result?.bankInfos;

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAcc(e.target.value);
  };
  const onChangeOption = (e: any) => {
    setBankValue(e.target.value);
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
  prevPage,
  setCheckUsers,
  checkUsers,
  userInfoData,
  setUserInfoData,
}: {
  nextPage: () => void;
  prevPage: () => void;
  setCheckUsers: React.Dispatch<React.SetStateAction<Set<SpaceMemberDetail>>>;
  checkUsers: Set<SpaceMemberDetail>;
  userInfoData: SpaceMemberDetail[] | undefined;
  setUserInfoData: React.Dispatch<React.SetStateAction<UserInfoInSpace[]>>;
}) => {
  let event_id = 1;
  const [tabIndex, setTabIndex] = useState(0);
  const [search, setSearch] = useState("");
  const { data } = useEventsQuery(SPACE_ID);

  const checkUserHandler = (data: SpaceMemberDetail) => {
    const _checkUsers = new Set(checkUsers);
    if (Array.from(_checkUsers).some((value) => value.spaceMemberId === data.spaceMemberId)) {
      _checkUsers.delete(data);
      setCheckUsers(_checkUsers);
    } else {
      _checkUsers.add(data);
      setCheckUsers(_checkUsers);
    }
  };
  const checkUsersHandler = (data: SpaceMemberDetail[]) => {
    const _checkUsers = new Set(checkUsers);
    data.forEach((k) => {
      const found = Array.from(_checkUsers).find(
        (value) => value.spaceMemberId === k.spaceMemberId,
      );
      if (found !== undefined) {
        _checkUsers.delete(found);
        setCheckUsers(_checkUsers);
      } else {
        _checkUsers.add(k);
        setCheckUsers(_checkUsers);
      }
    });
    console.log(_checkUsers);
  };
  const menuArr = [
    { name: "QR 출석", content: "Tab menu ONE" },
    { name: "멤버", content: "Tab menu TWO" },
  ];

  const onEventPayHandler = (id: number) => {
    const res = data.result?.events.find((value) => value.id === id);
    if (res !== undefined) {
      const event_id = res.id;
      const event = getEvent(SPACE_ID, event_id).then((res) => {
        const arr: SpaceMemberDetail[] = [];
        res.result?.participants.forEach((value) => {
          const d = {
            spaceMemberId: value.id,
            nickname: value.name,
            profileImageUrl: value.profileImageUrl,
            isManager: false,
          };
          arr.push(d);
        });
        checkUsersHandler(arr);
      });
    }
  };
  return (
    <>
      <TopBarText left={LeftEnum.Back} center="" right="" backHandler={prevPage}></TopBarText>
      <s.ContainerDiv>
        <div style={{ margin: "2rem 0rem 2rem 0rem" }}>
          <s.NowPriceDiv>정산할 멤버를 선택해주세요</s.NowPriceDiv>
        </div>

        <s.TabMenu>
          {menuArr.map((value, index) => (
            <li
              key={index}
              className={index === tabIndex ? "submenu focused" : "submenu"}
              onClick={() => setTabIndex(index)}
            >
              {value.name}
            </li>
          ))}
        </s.TabMenu>
        {tabIndex === 0 ? (
          <div>
            {data.result?.events.map((value, index) => (
              <PayChatDiv key={index} info={value} handler={onEventPayHandler}></PayChatDiv>
            ))}
          </div>
        ) : (
          <s.ColumnFlexDiv style={{ width: "100%", paddingBottom: "5rem" }}>
            <s.SearchBarDiv>
              <s.SearchIconImg src={SearchIcon}></s.SearchIconImg>
              <s.SearchBar
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              ></s.SearchBar>
            </s.SearchBarDiv>
            {userInfoData !== undefined ? (
              <>
                {userInfoData
                  ?.filter((val) => {
                    if (search == "") {
                      return val;
                    } else if (val.nickname.toLowerCase().includes(search.toLowerCase())) {
                      return val;
                    }
                  })
                  .map((value) => (
                    <Member key={value.spaceMemberId}>
                      <section>
                        <img src={value.profileImageUrl} alt="profile img" />
                        <span className="name">{value.nickname}</span>
                      </section>
                      <CheckBox
                        onClick={() => {
                          checkUserHandler(value);
                        }}
                      />
                    </Member>
                  ))}
              </>
            ) : (
              <></>
            )}
          </s.ColumnFlexDiv>
        )}
      </s.ContainerDiv>
      <BottomBtn onClick={nextPage}>{checkUsers.size}명 선택</BottomBtn>
    </>
  );
};

const CreateRequestPage3 = ({
  nextPage,
  prevPage,
  checkUsers,
  setTotalPrice,
  tabIndex,
  setTabIndex,
}: {
  nextPage: () => void;
  prevPage: () => void;
  checkUsers: Set<SpaceMemberDetail>;
  setTotalPrice: React.Dispatch<React.SetStateAction<number>>;
  tabIndex: number;
  setTabIndex: React.Dispatch<React.SetStateAction<number>>;
}) => {
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

  const selfChangePriceHandler = (id: number, e: React.ChangeEvent<HTMLInputElement>) => {
    let sum = 0;

    const price = Number.parseInt(e.target.value);
    idToPrice?.set(id, price);

    for (const value of idToPrice.values()) {
      sum = sum + value;
    }

    console.log(idToPrice, "KKKKK");
    _setTotalPrice(sum);
  };

  const nPriceHandler = () => {
    if (nPrice !== undefined) {
      Array.from(checkUsers).forEach((value) => {
        idToPrice?.set(value.spaceMemberId, Number.parseInt((nPrice / checkUsers.size).toString()));
      });
    } else {
      alert("에러!");
    }
  };

  return (
    <>
      <TopBarText left={LeftEnum.Back} center="" right="" backHandler={prevPage}></TopBarText>
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
              {Array.from(checkUsers).map((value) => (
                <Member key={value.spaceMemberId}>
                  <section>
                    <img src={value.profileImageUrl} alt="profile img" />
                    <span className="name">{value.nickname}</span>
                  </section>
                  <s.RowFlexDiv>
                    <s.NormalTextDiv>
                      {nPrice !== undefined
                        ? Number.parseInt((nPrice / checkUsers.size).toString())
                        : "NaN"}
                    </s.NormalTextDiv>
                    <s.TextDiv>원</s.TextDiv>
                  </s.RowFlexDiv>
                </Member>
              ))}
            </div>
          </div>
        ) : (
          <div style={{ margin: "1.25rem" }}>
            <div style={{ marginTop: "1.5rem" }}>
              {Array.from(checkUsers).map((value) => (
                <Member key={value.spaceMemberId}>
                  <section>
                    <img src={value.profileImageUrl} alt="profile img" />
                    <span className="name">{value.nickname}</span>
                  </section>
                  <s.RowFlexDiv>
                    <s.PriceInput2
                      placeholder="금액입력"
                      value={idToPrice?.get(value.spaceMemberId)}
                      onChange={(e) => {
                        selfChangePriceHandler(value.spaceMemberId, e);
                      }}
                    ></s.PriceInput2>
                  </s.RowFlexDiv>
                </Member>
              ))}
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
  prevPage,
  userInfoData,
  totalPrice,
  array,
  setArray,
  checkUsers,
  tabIndex,
}: {
  nextPage: () => void;
  prevPage: () => void;
  userInfoData: UserInfoInSpace[] | undefined;
  totalPrice: number;
  array: targetInfoList[];
  setArray: React.Dispatch<React.SetStateAction<targetInfoList[]>>;
  checkUsers: Set<SpaceMemberDetail>;
  tabIndex: number;
}) => {
  const price = addComma(totalPrice);
  return (
    <>
      <TopBarText left={LeftEnum.Back} center="" right="" backHandler={prevPage}></TopBarText>
      <s.ContainerDiv>
        <s.NowPriceDiv>이렇게 정산을 요청할까요?</s.NowPriceDiv>
        <s.GrayRoundDiv>
          <s.RowFlexDiv style={{ margin: "0.75rem 0rem 0.75rem 0rem", alignItems: "center" }}>
            <div>정산 총 금액</div>
            <s.NowPriceDiv style={{ marginLeft: "auto" }}> {price}&nbsp;원</s.NowPriceDiv>
          </s.RowFlexDiv>
          <hr style={{ border: "0.0625rem solid var(--GRAY-700, #45454B)" }}></hr>
          {Array.from(idToPrice).map((value) => {
            const _userData = Array.from(checkUsers).find((i) => i.spaceMemberId === value[0]);
            const _price = addComma(Number.parseInt(value[1].toString()));
            return (
              <Member key={value[0]}>
                <section>
                  <img src={_userData?.profileImageUrl} alt="profile img" />
                  <span className="name">{_userData?.nickname}</span>
                </section>
                <div>{_price}&nbsp;원</div>
              </Member>
            );
          })}
        </s.GrayRoundDiv>
      </s.ContainerDiv>
      <BottomBtn onClick={nextPage}>정산요청</BottomBtn>
    </>
  );
};

const CreateRequestPage = () => {
  const [page, setPage] = useState(0);
  // const [refresh, setRefresh] = useState(0);

  const [checkUsers, setCheckUsers] = useState(new Set<SpaceMemberDetail>());
  const [bankAccount, setBankAccount] = useState("");
  const [bankName, setBankName] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const [userInfoData, setUserInfoData] = useState<UserInfoInSpace[]>([]);
  const [array, setArray] = useState<targetInfoList[]>([]);
  const [tabIndex, setTabIndex] = useState(0);
  const arr: TargetOfPayRequest[] = [];
  const { mutate: createPay, isSuccess, isError } = useCreatePay(SPACE_ID);
  const { data } = useAllMembersQuery(SPACE_ID);

  const navigate = useNavigate();

  useEffect(() => {
    console.log(checkUsers);
  }, [checkUsers]);

  const nextPage = () => {
    setPage((prev) => prev + 1);
  };

  const prevPage = () => {
    if (page > 0) {
      setPage((prev) => prev - 1);
    } else {
      navigate(-1);
    }
  };

  useEffect(() => {
    const payType = tabIndex ? "EQUAL_SPLIT" : "INDIVIDUAL";
    const spaceId = SPACE_ID;
    if (page === 4 && spaceId !== null) {
      const data: RequestOfCreatePay = {
        totalAmount: totalPrice,
        bankName: bankName,
        bankAccountNum: bankAccount,
        targets: Array.from(idToPrice, ([targetMemberId, requestedAmount]) => ({
          targetMemberId,
          requestedAmount,
        })),
        valueOfPayType: payType,
      };
      createPay(data);
      // payCreateApi(totalPrice, bankName, bankAccount, array, Number.parseInt(spaceId)).then(() => {
      //   setIsComplete(true);
      // });
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
          prevPage={prevPage}
          //forceRefresh={forceRefresh}
          checkUsers={checkUsers}
          setCheckUsers={setCheckUsers}
          userInfoData={data.result?.spaceMemberDetails}
          setUserInfoData={setUserInfoData}
        ></CreateRequestPage2>
      );
    case 2:
      return (
        <CreateRequestPage3
          nextPage={nextPage}
          prevPage={prevPage}
          checkUsers={checkUsers}
          setTotalPrice={setTotalPrice}
          tabIndex={tabIndex}
          setTabIndex={setTabIndex}
        ></CreateRequestPage3>
      );
    case 3:
      // console.log(userInfoData);
      return (
        <CreateRequestPage4
          totalPrice={totalPrice}
          nextPage={nextPage}
          prevPage={prevPage}
          userInfoData={userInfoData}
          array={array}
          setArray={setArray}
          checkUsers={checkUsers}
          tabIndex={tabIndex}
        ></CreateRequestPage4>
      );
    case 4:
      if (isSuccess) {
        return <CompleteCreatePay></CompleteCreatePay>;
      } else {
        return <div>진행 중</div>;
      }

    // null jsx component 보낼 수 있는 경우 고려
    default:
      return <></>;
  }
};

export default CreateRequestPage;
