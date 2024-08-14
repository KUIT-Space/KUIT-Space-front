import setting from "@/assets/icon_setting.svg";
import logoSpace from "@/assets/logo_space.svg";
import alarm from "@/assets/icon_alarm.svg";
import bannerImage from "@/pages/HomePage/bannerImage.svg";
import bannerImageCover from "@/pages/HomePage/bannerImageCover.svg";
import next from "@/pages/HomePage/icon_next.svg";
import * as sty from "@/pages/HomePage/HomePage.styled";
import { SetStateAction, useState } from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("requested");

  const receivedSettlements = [{ name: "김민지", amount: 30000 }];

  const handleTabClick = (tab: SetStateAction<string>) => {
    setActiveTab(tab);
  };
  return (
    <>
      <sty.TopBar>
        <button
          onClick={() => {
            navigate("/");
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
        <img src={bannerImage} alt="배너이미지" />
        <img src={bannerImageCover} alt="오버레이 이미지" className="overlayImage" />
        <div className="bannerText">작업 안하면 죽는 방</div>
        <div className="tag">스페이서 20</div>
      </sty.MainBanner>

      <sty.NoticeContainer>
        <sty.Settlement>
          <div className="settlementTextContainer">
            <div className="settlementText">정산</div>
            <button>
              <img src={next} alt="자세히보기" />
            </button>
          </div>

          <div>
            <div className="tabs">
              <sty.StatusButton
                className={activeTab === "status" ? "active" : ""}
                onClick={() => handleTabClick("status")}
              >
                정산 현황
              </sty.StatusButton>
              <sty.RequestButton
                className={activeTab === "requested" ? "active" : ""}
                onClick={() => handleTabClick("requested")}
              >
                요청한 정산
              </sty.RequestButton>
              <sty.ReceivedButton
                className={activeTab === "received" ? "active" : ""}
                onClick={() => handleTabClick("received")}
              >
                요청받은 정산
              </sty.ReceivedButton>
            </div>

            <div className="content">
              {activeTab === "requested" && (
                <div>
                  <span className="subText">정산 완료까지 </span>
                  <span className="num">1</span>
                  <span className="subText">명 남았어요</span>
                  <br />
                  <span className="highlightMoney">30,000원 </span>
                  <span className="totalMoney"> /45,000 원</span>
                </div>
              )}
              {activeTab === "received" && (
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
              {activeTab === "status" && (
                <div>
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
          </div>
        </sty.Settlement>
      </sty.NoticeContainer>
    </>
  );
};

export default HomePage;
