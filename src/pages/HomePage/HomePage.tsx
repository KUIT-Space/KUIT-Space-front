import { SetStateAction, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import alarm from "@/assets/icon_alarm.svg";
import setting from "@/assets/icon_setting.svg";
import logoSpace from "@/assets/logo_space.svg";
import { BottomBtn } from "@/components/BottomBtn";
import bannerImage from "@/pages/HomePage/bannerImage.svg";
import bannerImageCover from "@/pages/HomePage/bannerImageCover.svg";
import * as sty from "@/pages/HomePage/HomePage.styled";
import next from "@/pages/HomePage/icon_next.svg";
import {
  HomeApiResponse,
  VoiceRoomApiResponse,
  getHomeApi,
  getVrApi,
} from "@/apis/HomePage/GetHomepageApi";
import { VrList } from "@/pages/VoiceRoomPage/VoiceRoomListPage";
import { noticeInfo } from "@/apis/HomePage/GetHomepageApi";

const HomePage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("requested");
  const [tabIndex, setTabIndex] = useState(0);

  const receivedSettlements = [{ name: "김민지", amount: 30000 }];
  const menuArr = [
    { name: "정산 현황", content: "Tab menu ONE" },
    { name: "요청한 정산", content: "Tab menu TWO" },
    { name: "요청받은 정산", content: "Tab menu Three" },
  ];

  const [homeData, setHomeData] = useState<HomeApiResponse | undefined>();
  const [vrData, setVrData] = useState<VoiceRoomApiResponse | undefined>();
  const [noticeList, setNoticeList] = useState<noticeInfo[] | undefined>([]);

  const NoticeComponent = () => {
    return (
      <sty.RoundDiv>
        <sty.RowFlexDiv style={{ alignItems: "center" }}>
          <sty.NoticeRoundDiv>공지</sty.NoticeRoundDiv>
          <div>디자인 공부를 어디서 해야할 지 모르겠다면</div>
        </sty.RowFlexDiv>
      </sty.RoundDiv>
    );
  };

  const selectMenuHandler = (index: number) => {
    setTabIndex(index);
  };

  useEffect(() => {}, [noticeList]);

  useEffect(() => {
    if (homeData?.noticeList !== undefined) {
      let _temp = homeData?.noticeList;

      let newArr = [..._temp];
      setNoticeList(newArr);
    }
  }, [homeData]);

  useEffect(() => {
    const id = localStorage.getItem("spaceId");
    if (id !== null) {
      getHomeApi(Number.parseInt(id), setHomeData);
      getVrApi(Number.parseInt(id), setVrData);
    }
  }, []);

  return (
    <>
      <sty.TopBar>
        <button
          onClick={() => {
            navigate("/space");
          }}
        >
          <img src={logoSpace} alt="로고" />
        </button>
        <sty.SettingButtonsWrapper>
          <button>
            <img src={alarm} alt="알림" />
          </button>
          <button>
            <img src={setting} alt="설정" />
          </button>
        </sty.SettingButtonsWrapper>
      </sty.TopBar>

      <sty.MainBanner>
        <img
          src={homeData?.spaceProfileImg !== null ? homeData?.spaceProfileImg : bannerImage}
          alt="배너이미지"
        />
        <img src={bannerImageCover} alt="오버레이 이미지" className="overlayImage" />
        <div className="bannerText">{homeData?.spaceName}</div>
        <div className="tag">스페이서 {homeData?.memberNum}</div>
      </sty.MainBanner>

      <BottomBtn style={{ position: "relative" }}>
        <Link to="/login">로그인</Link>
      </BottomBtn>

      <sty.NoticeContainer>
        <sty.Settlement>
          <div className="settlementTextContainer">
            <div className="settlementText">정산</div>
            <button>
              <img src={next} alt="자세히보기" />
            </button>
          </div>

          <sty.RoundDiv>
            <sty.TabMenu>
              {menuArr.map((value, index) => (
                <li
                  key={index}
                  className={index === tabIndex ? "submenu focused" : "submenu"}
                  onClick={() => selectMenuHandler(index)}
                >
                  {value.name}
                </li>
              ))}
            </sty.TabMenu>

            <div className="content">
              {tabIndex === 0 && (
                <div>
                  <span className="subText">정산 완료까지 </span>
                  <span className="num">1</span>
                  <span className="subText">명 남았어요</span>
                  <br />
                  <span className="highlightMoney">30,000원 </span>
                  <span className="totalMoney"> /45,000 원</span>
                </div>
              )}
              {tabIndex === 1 && (
                <div>
                  {receivedSettlements.map((settlement, index) => (
                    <div key={index}>
                      <span className="num">{settlement.name}</span>
                      <span className="subText">님이 정산을 요청했어요</span>
                      <br />
                      <span className="highlightMoney">{settlement.amount}원</span>
                    </div>
                  ))}
                </div>
              )}
              {tabIndex === 2 && (
                <div style={{ width: "100%" }}>
                  <span className="highlightText">요청한 정산이 </span>
                  <span className="num">1</span>
                  <span className="highlightText">건</span>
                  <br />
                  <span className="highlightText">요청받은 정산이 </span>{" "}
                  <span className="num">2</span>
                  <span className="highlightText">건 있습니다</span>
                </div>
              )}
            </div>
          </sty.RoundDiv>

          {/* 여기는 공지사항 */}
          <div className="settlementTextContainer" style={{ marginTop: "2.0938rem" }}>
            <div className="settlementText">공지사항</div>
            <button>
              <img src={next} alt="자세히보기" />
            </button>
          </div>

          {noticeList !== undefined &&
            noticeList.map((value, index) => <div key={index}>{value.title}</div>)}

          <>{/* 여기는 보이스룸 */}</>

          <div className="settlementTextContainer" style={{ marginTop: "2.0938rem" }}>
            <div className="settlementText">활동 중인 보이스룸</div>
            <button>
              <img src={next} alt="자세히보기" />
            </button>
          </div>
          {vrData !== undefined &&
            vrData.voiceRoomList.map(
              (value, index) =>
                value.active === true && (
                  <sty.HomeVoiceRoomDiv>
                    <sty.ColumnFlexDiv>
                      <sty.VoiceRoomTitleDiv>{value.name}</sty.VoiceRoomTitleDiv>
                      <sty.RoundDiv
                        style={{
                          width: "10rem",
                          padding: "0.375rem",
                          marginTop: "6px 0rem 0rem 0.5rem",
                        }}
                      >
                        대화 중인 스페이서 {value.numParticipant}명
                      </sty.RoundDiv>
                    </sty.ColumnFlexDiv>
                  </sty.HomeVoiceRoomDiv>
                ),
            )}
        </sty.Settlement>
      </sty.NoticeContainer>
    </>
  );
};

export default HomePage;
