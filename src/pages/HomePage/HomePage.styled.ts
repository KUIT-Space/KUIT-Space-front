import styled from "styled-components";

export const TopBar = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 52px;
  padding: 12px 10.08px 8px 20px;
  justify-content: space-between;
`;

export const SettingButtonsWrapper = styled.div`
  display: flex;
  gap: 2.08px;
`;

export const MainBanner = styled.div`
  position: relative;
  text-align: center;

  img {
    width: 100%;
    height: auto;
  }

  .overlayImage {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .bannerText {
    position: absolute;
    bottom: 26.08px;
    left: 20px;
    color: #fff;
    font-family: Freesentation;
    font-size: 28px;
    font-style: normal;
    font-weight: 700;
    line-height: 140%;
    letter-spacing: 0.56px;
  }

  .tag {
    position: absolute;
    background-color: #efeff0;
    color: #171719;
    text-align: center;
    font-family: Freesentation;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 140%;
    letter-spacing: 0.24px;
    padding: 5.44px 16px;
    border-radius: 100px;
    bottom: 32px;
    right: 20px;
  }
`;

export const NoticeContainer = styled.div`
  position: relative;
  top: -16px;
  background-color: #171719;
  border-radius: 12px 12px 0px 0px;
  width: 100%;
  margin: 0 auto;
  padding-bottom: 64px;
`;

export const Settlement = styled.div`
  display: flex;
  padding: 30.08px 20px;
  flex-direction: column;
  gap: 8px;

  .settlementTextContainer {
    display: flex;
    align-items: center;
    gap: 6.08px;
    margin-top: 0.75rem;
    cursor: pointer;
  }

  .settlementText {
    color: #fff;
    font-family: Freesentation;
    font-size: 18px;
    font-style: normal;
    font-weight: 600;
    line-height: 140%;
    letter-spacing: 0.72px;
  }

  .tabs {
    display: flex;
    color: #45454b;
    font-family: Freesentation;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 140%;
    letter-spacing: 0.56px;
  }

  .tabs button.active {
    color: #fff;
    font-family: Freesentation;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 140%;
    letter-spacing: 0.56px;
    border-bottom: 1px solid #48ffbd;
    width: 108px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .content {
    display: flex;
    padding: 20px 16px 20px 16px;
    align-items: center;
    align-self: stretch;
    border-radius: 0px 0px 12px 12px;
  }

  .subText {
    color: #acacb5;
    font-family: Freesentation;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 140%;
    letter-spacing: 0.56px;
  }

  .num {
    color: var(--Foundation-Main-color-Normal, var(--normal, #48ffbd));

    /* text/Regular 14pt */
    font-family: Freesentation;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 140%; /* 19.6px */
    letter-spacing: 0.56px;
  }

  .highlightMoney {
    color: #fff;

    /* text/Bold 18pt */
    font-family: Freesentation;
    font-size: 18px;
    font-style: normal;
    font-weight: 700;
    line-height: 140%; /* 25.2px */
    letter-spacing: 0.72px;
  }

  .totalMoney {
    color: #fff;

    /* text/Medium 14pt */
    font-family: Freesentation;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 140%; /* 19.6px */
    letter-spacing: 0.56px;
  }

  .highlightText {
    color: #fff;

    /* text/Medium 14pt */
    font-family: Freesentation;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 140%; /* 19.6px */
    letter-spacing: 0.56px;
  }
`;

export const StatusButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border-radius: 12px 0px 0px 0px;
  background: #222226;
  width: 106px;
  height: 44px;
`;

export const RequestButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border-radius: 0px 0px 0px 0px;
  background: #222226;
  width: 106px;
  height: 44px;
`;

export const ReceivedButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border-radius: 0px 12px 0px 0px;
  background: #222226;
  width: 106px;
  height: 44px;
`;

export const TabMenu = styled.ul`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  color: var(--Foundation-Gray-white, #fff);

  .submenu {
    display: flex;
    width: calc(100% / 2);
    padding: 12px 0px 12px 0px;
    color: var(--Foundation-Gray-gray600, var(--GRAY-700, #45454b));

    /* text/Regular 16pt */
    font-family: Freesentation;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 140%; /* 22.4px */
    letter-spacing: 0.64px;

    justify-content: center;
    cursor: pointer;
  }
  .focused {
    color: var(--Foundation-Gray-white, #fff);

    /* text/Medium 16pt */
    font-family: Freesentation;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 140%; /* 22.4px */
    letter-spacing: 0.64px;

    border-bottom: 0.0625rem solid #48ffbd;
    justify-content: center;
    cursor: pointer;
  }
`;
export const RoundDiv = styled.div`
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 0.625rem;

  border-radius: 12px;
  background: var(--Foundation-Gray-gray800, #222226);

  color: var(--material-theme-Gray-gray200, #efeff0);

  /* text/Regular 14pt */
  font-family: Freesentation;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 140%; /* 19.6px */
  letter-spacing: 0.56px;
`;
export const ColumnFlexDiv = styled.div`
  display: flex;
  flex-direction: column;
`;
export const RowFlexDiv = styled.div`
  display: flex;
  flex-direction: row;
`;

export const NoticeRoundDiv = styled.div`
  border-radius: 8px;
  border: 1px solid var(--normal, #48ffbd);

  padding: 4px 10px;

  color: var(--Foundation-Main-color-Normal, var(--normal, #48ffbd));
  text-align: center;

  /* text/Regular 12pt */
  font-family: Freesentation;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 140%; /* 16.8px */
  letter-spacing: 0.24px;

  margin-right: 10px;
`;

export const HomeVoiceRoomDiv = styled.div`
  border-radius: 12px;
  background: linear-gradient(99deg, #f098f1 0%, #549af7 100%);
  padding: 16px;

  height: 160px;

  color: #000;

  /* text/SemiBold 20pt */
  font-family: Freesentation;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: 140%; /* 28px */
  letter-spacing: 0.4px;
`;

export const VoiceRoomTitleDiv = styled.div`
  color: #000;

  /* text/SemiBold 20pt */
  font-family: Freesentation;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: 140%; /* 28px */
  letter-spacing: 0.4px;
`;
export const NoAlertDiv = styled.div`
  display: flex;
  width: 100%;
  height: 88px;
  justify-content: center;
  align-items: center;

  color: var(--Foundation-Gray-gray500, #767681);

  /* text/Medium 14pt */
  font-family: Freesentation;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 140%; /* 19.6px */
  letter-spacing: 0.56px;
`;

export const ProfileImgDiv = styled.div`
  display: flex;
  width: 100%;
  height: 288px;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  margin-top: 40px;
`;

export const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  margin: 0px 20px 0px 20px;
`;

export const ProfileImg = styled.img`
  border-radius: 50%;
  width: 150px;
  height: 150px;
  object-fit: cover;
`;

export const ProfileDiv = styled.div`
  margin-top: 16px;

  color: #fff;
  text-align: center;

  /* text/Bold 20pt */
  font-family: Freesentation;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: 140%; /* 28px */
  letter-spacing: 0.4px;

  display: flex;
  align-items: center;
`;
export const ProfileName = styled.div`
  color: #fff;
  text-align: center;

  /* text/Bold 20pt */
  font-family: Freesentation;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: 140%; /* 28px */
  letter-spacing: 0.4px;
`;

export const ProfileAuth = styled.div`
  color: var(--normal, #48ffbd);
  text-align: center;

  /* text/Regular 16pt */
  font-family: Freesentation;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 140%; /* 22.4px */
  letter-spacing: 0.64px;

  margin-left: 8px;
`;

export const ProfileMsgDiv = styled.div`
  width: 100%;
  padding: 16px;
  min-height: 100px;
  background: var(--Foundation-Gray-gray800, #222226);

  overflow: hidden;
  color: var(--Foundation-Gray-white, #fff);
  text-overflow: ellipsis;
  white-space: nowrap;

  /* text/Regular 16pt */
  font-family: Freesentation;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 140%; /* 22.4px */
  letter-spacing: 0.64px;
`;

export const BoardTitleDiv = styled.div`
  /* Regular 15pt */
  overflow: hidden;
  color: var(--Foundation-Gray-gray500, #fff);
  text-overflow: ellipsis;

  /* Regular 15pt */
  font-family: Freesentation;
  font-size: 0.9375rem;
  font-style: normal;
  font-weight: 400;
  line-height: 140%; /* 1.3125rem */
  letter-spacing: 0.0375rem;

  margin-left: 0.75rem;
`;

export const BoardNoneTitleDiv = styled.div`
  /* Regular 15pt */
  overflow: hidden;
  color: var(--Foundation-Gray-gray500, #767681);
  text-overflow: ellipsis;

  /* Regular 15pt */
  font-family: Freesentation;
  font-size: 0.9375rem;
  font-style: normal;
  font-weight: 400;
  line-height: 140%; /* 1.3125rem */
  letter-spacing: 0.0375rem;

  margin-left: 0.75rem;
`;

export const BoardNameDiv = styled.div`
  overflow: hidden;
  color: var(--Foundation-Gray-white, #fff);
  text-overflow: ellipsis;

  /* Medium 15pt */
  font-family: Freesentation;
  font-size: 0.9375rem;
  font-style: normal;
  font-weight: 500;
  line-height: 140%; /* 1.3125rem */
  letter-spacing: 0.0375rem;
`;
