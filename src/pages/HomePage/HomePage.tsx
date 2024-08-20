import { SetStateAction, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  getHomeApi,
  getVrApi,
  HomeApiResponse,
  VoiceRoomApiResponse,
} from "@/apis/HomePage/GetHomepageApi";
import { noticeInfo } from "@/apis/HomePage/GetHomepageApi";
import alarm from "@/assets/icon_alarm.svg";
import setting from "@/assets/icon_setting.svg";
import logoSpace from "@/assets/logo_space.svg";
import { BottomBtn } from "@/components/BottomBtn";
import bannerImage from "@/pages/HomePage/bannerImage.svg";
import bannerImageCover from "@/pages/HomePage/bannerImageCover.svg";
import * as sty from "@/pages/HomePage/HomePage.styled";
import next from "@/pages/HomePage/icon_next.svg";
import { addComma, PayReceiveInfo, PayRequestInfo } from "@/pages/PayPage/PayPage";
import { VrList } from "@/pages/VoiceRoomPage/VoiceRoomListPage";

const HomePage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("requested");
  const [tabIndex, setTabIndex] = useState(0);

  const menuArr = [
    { name: "정산 현황", content: "Tab menu ONE" },
    { name: "요청한 정산", content: "Tab menu TWO" },
    { name: "요청받은 정산", content: "Tab menu Three" },
  ];

  const [homeData, setHomeData] = useState<HomeApiResponse | undefined>();
  const [vrData, setVrData] = useState<VoiceRoomApiResponse | undefined>();
  const [noticeList, setNoticeList] = useState<noticeInfo[] | undefined>([]);
  const [receive, setReceive] = useState(0);
  const [request, setRequest] = useState(0);
  const [receiveData, setReceiveData] = useState<PayReceiveInfo>();
  const [requestData, setRequestData] = useState<PayRequestInfo>();

  const NoticeComponent = ({ data }: { data: noticeInfo }) => {
    return (
      <sty.RoundDiv
        onClick={() => {
          navigate(`/board/${data.postId}`);
        }}
      >
        <sty.RowFlexDiv style={{ alignItems: "center" }}>
          <sty.NoticeRoundDiv>공지</sty.NoticeRoundDiv>
          <div>{data.title}</div>
        </sty.RowFlexDiv>
      </sty.RoundDiv>
    );
  };

  const selectMenuHandler = (index: number) => {
    setTabIndex(index);
  };

  useEffect(() => {}, [noticeList]);

  useEffect(() => {
    console.log(homeData);
    if (homeData?.noticeList !== undefined) {
      const _temp = homeData?.noticeList;

      const newArr = [..._temp];
      setNoticeList(newArr);
    }
    if (homeData !== undefined) {
      setReceive(homeData.payReceiveInfoDtoList.length);
      setRequest(homeData.payRequestInfoDtoList.length);
      if (homeData.payReceiveInfoDtoList !== undefined) {
        setReceiveData(homeData.payReceiveInfoDtoList[0]);
      }
      if (homeData.payRequestInfoDtoList !== undefined) {
        setRequestData(homeData.payRequestInfoDtoList[0]);
      }
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
        <div
          className="tag"
          style={{ cursor: "pointer" }}
          onClick={() => {
            navigate("/members");
          }}
        >
          스페이서 {homeData?.memberNum}
        </div>
      </sty.MainBanner>

      <BottomBtn style={{ position: "relative" }}>
        <Link to="/login">로그인</Link>
      </BottomBtn>

      <sty.NoticeContainer>
        <sty.Settlement>
          <div
            className="settlementTextContainer"
            onClick={() => {
              navigate("/pay");
            }}
          >
            <sty.RowFlexDiv style={{ alignItems: "center" }}>
              <div className="settlementText">정산</div>
              <img src={next} alt="자세히보기" />
            </sty.RowFlexDiv>
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
                <div style={{ width: "100%" }}>
                  <span className="highlightText">요청한 정산이 </span>
                  <span className="num">{request}</span>
                  <span className="highlightText">건</span>
                  <br />
                  <span className="highlightText">요청받은 정산이 </span>
                  <span className="num">{receive}</span>
                  <span className="highlightText">건 있습니다</span>
                </div>
              )}

              {tabIndex === 1 && (
                <div>
                  {requestData ? (
                    <>
                      <span className="subText">정산 완료까지 </span>
                      <span className="num">
                        {requestData?.totalTargetNum! - requestData?.receiveTargetNum!}
                      </span>
                      <span className="subText">명 남았어요</span>
                    </>
                  ) : (
                    <span></span>
                  )}

                  <br />
                  {requestData ? (
                    <>
                      <span className="highlightMoney">
                        {addComma(requestData?.receiveAmount!)}{" "}
                      </span>
                      <span className="totalMoney"> /{addComma(requestData?.totalAmount!)} 원</span>
                    </>
                  ) : (
                    <span className="subText">요청한 정산이 없습니다</span>
                  )}
                </div>
              )}

              {tabIndex === 2 && (
                <div>
                  {receiveData ? (
                    <>
                      <span className="num">{receiveData?.payCreatorName}</span>
                      <span className="subText">님이 정산을 요청했어요</span>
                      <br />
                      <span className="highlightMoney">{receiveData?.requestAmount}원</span>
                    </>
                  ) : (
                    <span className="subText">요청받은 정산이 없습니다</span>
                  )}
                </div>
              )}
            </div>
          </sty.RoundDiv>

          {/* 여기는 공지사항 */}
          <div
            className="settlementTextContainer"
            onClick={() => {
              navigate("/board");
            }}
            style={{ marginTop: "1.75rem" }}
          >
            <sty.RowFlexDiv style={{ alignItems: "center" }}>
              <div className="settlementText">공지사항</div>
              <img src={next} alt="자세히보기" />
            </sty.RowFlexDiv>
          </div>

          {noticeList !== undefined ? (
            noticeList.map((value, index) => (
              <NoticeComponent key={value.postId} data={value}></NoticeComponent>
            ))
          ) : (
            <sty.NoAlertDiv>등록된 공지가 없어요</sty.NoAlertDiv>
          )}

          <>{/* 여기는 보이스룸 */}</>

          <div
            className="settlementTextContainer"
            onClick={() => {
              navigate("/voiceroom");
            }}
            style={{ marginTop: "1.75rem" }}
          >
            <sty.RowFlexDiv style={{ alignItems: "center" }}>
              <div className="settlementText">활동 중인 보이스룸</div>
              <img src={next} alt="자세히보기" />
            </sty.RowFlexDiv>
          </div>
          {vrData !== undefined ? (
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
            )
          ) : (
            <sty.NoAlertDiv>쉿, 조용해요</sty.NoAlertDiv>
          )}
        </sty.Settlement>
      </sty.NoticeContainer>
    </>
  );
};

export default HomePage;
