import TopBarText, { LeftEnum } from "@/components/TopBarText";
import { ColumnFlexDiv, RowFlexDiv } from "./HomePage.styled";
import QRSettingIcon from "@/assets/icon_qr.svg";
import styled from "styled-components";

const StyledMenuConatiner = styled.div`
  margin: 1.25rem;
  gap: 1.8125rem;
  align-items: center;
  display: flex;
  flex-direction: row;
`;
const StyledMenuDiv = styled.div`
  color: #fff;

  /* text/Regular 18pt */
  font-family: Freesentation;
  font-size: 1.125rem;
  font-style: normal;
  font-weight: 400;
  line-height: 140%; /* 1.575rem */
  letter-spacing: 0.045rem;
`;

const onQRSettingClick = () => {};
const HomePageSetting = () => {
  return (
    <>
      <TopBarText left={LeftEnum.Back} center={"관리자 설정"} right={""} />
      <ColumnFlexDiv>
        <StyledMenuConatiner onClick={onQRSettingClick}>
          <img src={QRSettingIcon} width={"18px"} height={"18px"} />
          <StyledMenuDiv>QR 출석 관리</StyledMenuDiv>
        </StyledMenuConatiner>
      </ColumnFlexDiv>
    </>
  );
};

export default HomePageSetting;
