import styled from "styled-components";

export const TopBar = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 3.25rem;
  padding: 0.75rem 0.63rem 0.5rem 1.25rem;
  justify-content: space-between;
`;

export const SettingButtonsWrapper = styled.div`
  display: flex;
  gap: 0.13rem;
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
    bottom: 1.63rem;
    left: 1.25rem;
    color: #fff;
    font-family: Freesentation;
    font-size: 1.75rem;
    font-style: normal;
    font-weight: 700;
    line-height: 140%;
    letter-spacing: 0.035rem;
  }

  .tag {
    position: absolute;
    background-color: #efeff0;
    color: #171719;
    text-align: center;
    font-family: Freesentation;
    font-size: 0.75rem;
    font-style: normal;
    font-weight: 400;
    line-height: 140%;
    letter-spacing: 0.015rem;
    padding: 0.34rem 1rem;
    border-radius: 6.25rem;
    bottom: 2rem;
    right: 1.25rem;
  }
`;

export const NoticeContainer = styled.div`
  position: relative;
  top: -1rem;
  background-color: #171719;
  border-radius: 0.75rem 0.75rem 0rem 0rem;
  width: 100%;
  margin: 0 auto;
`;

export const Settlement = styled.div`
  display: flex;
  padding: 1.88rem 1.25rem;
  flex-direction: column;
  gap: 0.5rem;

  .settlementTextContainer {
    display: flex;
    align-items: center;
    gap: 0.38rem;
  }

  .settlementText {
    color: #fff;
    font-family: Freesentation;
    font-size: 1.125rem;
    font-style: normal;
    font-weight: 600;
    line-height: 140%;
    letter-spacing: 0.045rem;
  }

  .tabs {
    display: flex;
    color: #45454b;
    font-family: Freesentation;
    font-size: 0.875rem;
    font-style: normal;
    font-weight: 400;
    line-height: 140%;
    letter-spacing: 0.035rem;
  }

  .tabs button.active {
    color: #fff;
    font-family: Freesentation;
    font-size: 0.875rem;
    font-style: normal;
    font-weight: 500;
    line-height: 140%;
    letter-spacing: 0.035rem;
    border-bottom: 0.0625rem solid #48ffbd;
    width: 6.75rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .content {
    display: flex;
    padding: 1.3125rem 9.5rem 1.25rem 1rem;
    align-items: center;
    align-self: stretch;
    border-radius: 0rem 0rem 0.75rem 0.75rem;
    background: #222226;
    width: 20rem;
  }

  .subText {
    color: #acacb5;
    font-family: Freesentation;
    font-size: 0.875rem;
    font-style: normal;
    font-weight: 400;
    line-height: 140%;
    letter-spacing: 0.035rem;
  }

  .num {
    color: var(--Foundation-Main-color-Normal, var(--normal, #48ffbd));

    /* text/Regular 14pt */
    font-family: Freesentation;
    font-size: 0.875rem;
    font-style: normal;
    font-weight: 400;
    line-height: 140%; /* 1.225rem */
    letter-spacing: 0.035rem;
  }

  .highlightMoney {
    color: #fff;

    /* text/Bold 18pt */
    font-family: Freesentation;
    font-size: 1.125rem;
    font-style: normal;
    font-weight: 700;
    line-height: 140%; /* 1.575rem */
    letter-spacing: 0.045rem;
  }

  .totalMoney {
    color: #fff;

    /* text/Medium 14pt */
    font-family: Freesentation;
    font-size: 0.875rem;
    font-style: normal;
    font-weight: 500;
    line-height: 140%; /* 1.225rem */
    letter-spacing: 0.035rem;
  }

  .highlightText {
    color: #fff;

    /* text/Medium 14pt */
    font-family: Freesentation;
    font-size: 0.875rem;
    font-style: normal;
    font-weight: 500;
    line-height: 140%; /* 1.225rem */
    letter-spacing: 0.035rem;
  }
`;

export const StatusButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border-radius: 0.75rem 0rem 0rem 0rem;
  background: #222226;
  width: 6.625rem;
  height: 2.75rem;
`;

export const RequestButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border-radius: 0rem 0rem 0rem 0rem;
  background: #222226;
  width: 6.625rem;
  height: 2.75rem;
`;

export const ReceivedButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border-radius: 0rem 0.75rem 0rem 0rem;
  background: #222226;
  width: 6.625rem;
  height: 2.75rem;
`;
