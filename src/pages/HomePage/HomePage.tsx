import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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
import bannerImage from "@/pages/HomePage/bannerImage.svg";
import bannerImageCover from "@/pages/HomePage/bannerImageCover.svg";
import * as sty from "@/pages/HomePage/HomePage.styled";
import next from "@/pages/HomePage/icon_next.svg";
import { addComma, PayReceiveInfo, PayRequestInfo } from "@/pages/PayPage/PayPage";
import { NoticeDetail, SubscriptionsDetail, useHomeQuery } from "@/apis/Home";
import { SPACE_ID } from "@/utils/constants";

const HomePage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("requested");
  const [tabIndex, setTabIndex] = useState(0);

  const menuArr = [
    { name: "정산 현황", content: "Tab menu ONE" },
    { name: "요청한 정산", content: "Tab menu TWO" },
    { name: "요청받은 정산", content: "Tab menu Three" },
  ];

  const { data } = useHomeQuery(SPACE_ID);
  //TODO
  const noticeList = data.result?.notices;
  // const noticeList = [
  //   { content: "테스트", timePassed: "1일 전", postId: 1 },
  //   { content: "테스트", timePassed: "1일 전", postId: 1 },
  // ];
  const subscribeList = data.result?.subscriptions;
  // const subscribeList = [
  //   { boardId: 1, boardName: "정산게시판", boardTitle: "정산해주세요", tagName: "태그" },
  //   { boardId: 2, boardName: "정산게시판", boardTitle: "정산해주세요", tagName: "태그" },
  // ];

  const NoticeComponent = ({ data }: { data: NoticeDetail }) => {
    return (
      <sty.RowFlexDiv
        onClick={() => {
          //TODO
          // navigate(`/board/${data.postId}`);
        }}
        style={{ alignItems: "center" }}
      >
        <sty.NoticeRoundDiv>공지</sty.NoticeRoundDiv>
        <div>{data.title}</div>
      </sty.RowFlexDiv>
    );
  };

  const SubscribeComponent = ({ data }: { data: SubscriptionsDetail }) => {
    return (
      <sty.RowFlexDiv
        onClick={() => {
          //TODO
          // navigate(`/board/${data.postId}`);
        }}
        style={{ alignItems: "center" }}
      >
        <sty.BoardNameDiv>{data.boardName}</sty.BoardNameDiv>
        <sty.BoardTitleDiv>{data.boardTitle}</sty.BoardTitleDiv>
      </sty.RowFlexDiv>
    );
  };

  const selectMenuHandler = (index: number) => {
    setTabIndex(index);
  };

  // useEffect(() => {
  //   const id = localStorage.getItem("spaceId");
  //   if (id !== null) {
  //     getHomeApi(Number.parseInt(id), setHomeData);
  //     getVrApi(Number.parseInt(id), setVrData);
  //   }
  // }, []);

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
        <span>{data.result?.spaceName}</span>
        <sty.SettingButtonsWrapper>
          {/* <button
            onClick={() => {
              //TODO: 임시로 스페이스 선택으로 고
              navigate("/space");
            }}
          >
            <img src={alarm} alt="알림" />
          </button> */}
          <button
            onClick={() => {
              //TODO: 임시로 스페이스 선택으로 고
              navigate("/qr/home");
            }}
          >
            <img src={setting} alt="설정" />
          </button>
        </sty.SettingButtonsWrapper>
      </sty.TopBar>

      <sty.MainBanner>
        <img src={bannerImage} alt="배너이미지" />
        <img src={bannerImageCover} alt="오버레이 이미지" className="overlayImage" />
        <div className="bannerText">{data.result?.spaceName}</div>
        <div
          className="tag"
          style={{ cursor: "pointer" }}
          onClick={() => {
            navigate("/members");
          }}
        >
          스페이서 {data.result?.memberCnt}
        </div>
      </sty.MainBanner>

      {/* <BottomBtn style={{ position: "relative" }}>
        <Link to="/login">로그인</Link>
      </BottomBtn> */}

      <sty.NoticeContainer>
        <sty.Settlement>
          {/* 여기는 공지사항 */}
          <div>
            <div
              className="settlementTextContainer"
              onClick={() => {
                navigate("/board");
              }}
            >
              <sty.RowFlexDiv style={{ alignItems: "center" }}>
                <div className="settlementText">공지사항</div>
                <img src={next} alt="자세히보기" />
              </sty.RowFlexDiv>
            </div>
            <sty.RoundDiv>
              {noticeList === undefined || noticeList?.length === 0 ? (
                <sty.NoAlertDiv>등록된 공지가 없어요</sty.NoAlertDiv>
              ) : (
                noticeList.map((value, index) => <NoticeComponent key={index} data={value} />)
              )}
            </sty.RoundDiv>
          </div>
          <div>
            <div
              className="settlementTextContainer"
              onClick={() => {
                //TODO
                // navigate("/board");
              }}
            >
              <sty.RowFlexDiv style={{ alignItems: "center" }}>
                <div className="settlementText"> 구독한 게시판</div>
                <img src={next} alt="자세히보기" />
              </sty.RowFlexDiv>
            </div>
            <sty.RoundDiv>
              {subscribeList === undefined || subscribeList.length === 0 ? (
                <sty.NoAlertDiv>구독한 게시판이 없어요</sty.NoAlertDiv>
              ) : (
                subscribeList.map((value, index) => <SubscribeComponent key={index} data={value} />)
              )}
            </sty.RoundDiv>
          </div>
        </sty.Settlement>
      </sty.NoticeContainer>
    </>
  );
};

export default HomePage;
