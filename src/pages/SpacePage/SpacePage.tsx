import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { SpaceJoinInfoApi } from "@/apis/Space/SpaceJoinInfoApi";
import { SpaceInfo, SpaceSelectApi, UserSpaceListResult } from "@/apis/Space/SpaceSelectApi";
import add from "@/assets/icon_add.svg";
import setting from "@/assets/icon_setting.svg";
import edit from "@/assets/Space/icon_space_edit.svg";
import TopBarText, { LeftEnum } from "@/components/TopBarText";
import { getUserDefaultImageURL } from "@/utils/getUserDefaultImageURL";

const TopBarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 2;
  margin: 0rem 1.25rem 0rem 1.25rem;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  margin: 0rem 1.25rem 0rem 1.25rem;
  border-radius: 12px;

  margin-bottom: 1.625rem;
  z-index: 2;
`;

const GridItem = styled.div`
  position: relative;
  display: flex;
  background-color: ${({ theme }) => theme.colors.BG800};
  border-radius: 12px;
  justify-content: center;
  align-items: center;
  z-index: 2;

  .space-image {
    width: 100%;
    height: 100%;
  }

  .spaceId {
    position: absolute;
    left: 5%;
    top: 5%;
    background-color: ${({ theme }) => theme.colors.white};
    color: ${({ theme }) => theme.colors.BG800};
    padding: 0.125rem 0.25rem;
    border-radius: 0.25rem;
  }

  .invite {
    position: absolute;
    right: 5%;
    top: 5%;
    background-color: ${({ theme }) => theme.colors.dark_hover};
    padding: 0.125rem 0.25rem;
    border-radius: 0.25rem;
  }
`;

const SettingBtn = styled.img`
  margin-left: auto;
  cursor: pointer;
`;

const Title = styled.h1`
  font-size: 28px;
  font-weight: bold;
`;

const Subtitle = styled.span`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.BG500};
`;

const SpaceNumber = styled.span`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.char_lime};
`;

const EditBtn = styled.img<{ active: boolean }>`
  display: flex;
  width: 36px;
  height: 36px;
  align-items: center;
  cursor: pointer;
  color: red;
  filter: ${({ active }) =>
    active
      ? "invert(64%) sepia(95%) saturate(358%) hue-rotate(68deg) brightness(91%) contrast(89%)"
      : "none"};
  z-index: 2;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: black;
  opacity: 0.7;
  z-index: 1;
`;

const SpacePage = () => {
  const navigate = useNavigate();
  const [editActive, setEditActive] = useState(false);
  const [spaceInfoList, setSpaceInfoList] = useState<SpaceInfo[]>([]);
  const [userSpaceResult, setUserSpaceResult] = useState<UserSpaceListResult>();
  const [lastUserSpaceId, setLastUserSpaceId] = useState<number>(0);

  useEffect(() => {
    //TODO : lastUserSpaceId 값에 따라 추가로 더 받아와서 무한스크롤 구현
    SpaceSelectApi(10, lastUserSpaceId).then((res) => {
      if (res) {
        setLastUserSpaceId(res.result.lastUserSpaceId);
        setUserSpaceResult(res.result);
        setSpaceInfoList(res.result.spaceInfoList);
      }
    });
  }, []);

  useEffect(() => {
    //TODO : 임시로 초대받은 스페이스를 배열에 추가 (ex. spaceId: 3, 6, 9)
    const tempInviteSpace = [3, 6, 9, 11];
    Promise.all(
      tempInviteSpace.map(async (spaceId) => {
        let spaceInfo: SpaceInfo = {
          spaceId: spaceId,
          spaceName: "",
          profileImgUrl: "",
          isInvited: false,
          createdAt: "",
          memberNum: 0,
        };
        await SpaceJoinInfoApi(spaceId).then((res) => {
          if (res) {
            spaceInfo = {
              spaceId: spaceId,
              spaceName: res.result.spaceName,
              profileImgUrl: res.result.spaceProfileImg,
              isInvited: true,
              createdAt: res.result.createdAt,
              memberNum: res.result.memberNum,
            };
          }
        });
        return spaceInfo;
      }),
    ).then((res) => {
      setSpaceInfoList((prev) => [...res.filter((spaceInfo) => spaceInfo.isInvited), ...prev]);
    });
  }, []);

  const toggleEdit = () => {
    setEditActive(!editActive);
  };

  return (
    <>
      {editActive && <Overlay />}
      <div style={{ margin: "auto", paddingBottom: "10px", position: "relative" }}>
        <TopBarContainer>
          <TopBarText left={LeftEnum.Logo} center="" right="" />
          <SettingBtn src={setting} alt="setting" onClick={() => navigate("/space/spaceoption")} />
        </TopBarContainer>
        <div
          style={{
            height: "202px",
            display: "flex",
            flexDirection: "column",
            margin: "0rem 1.25rem 0rem 1.25rem",
          }}
        >
          <div style={{ height: "39px", marginTop: "77px", display: "flex", alignItems: "center" }}>
            <Title>{userSpaceResult?.userName}의 스페이스</Title>
          </div>
          <div
            style={{
              height: "36px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <SpaceNumber>{userSpaceResult?.spaceInfoList.length}</SpaceNumber>
              <Subtitle>개의 스페이스</Subtitle>
            </div>
            <EditBtn src={edit} alt="edit" active={editActive} onClick={toggleEdit} />
          </div>
          {spaceInfoList.filter((spaceInfo) => spaceInfo.isInvited).length > 0 && (
            <div>
              <SpaceNumber>
                {spaceInfoList.filter((spaceInfo) => spaceInfo.isInvited).length}
              </SpaceNumber>
              <Subtitle>개의 스페이스 초대 받음</Subtitle>
            </div>
          )}
        </div>
      </div>
      <GridContainer>
        {spaceInfoList.map((info, index) => (
          <GridItem key={index}>
            <img
              className="space-image"
              src={info.profileImgUrl ?? getUserDefaultImageURL(info.spaceId)}
              alt={`Space ${info.spaceId}`}
              onClick={() => {
                localStorage.setItem("spaceId", info.spaceId.toString());
                sessionStorage.setItem("spaceId", info.spaceId.toString());

                //혹시 몰라 spaceInfo 저장
                localStorage.setItem("spaceInfo", JSON.stringify(info));
                sessionStorage.setItem("spaceInfo", JSON.stringify(info));

                if (info.isInvited) {
                  navigate("/invite", { state: { spaceInfo: info } });
                } else {
                  navigate("/");
                }
              }}
            />
            <span className="spaceId">{info.spaceId}</span>
            {info.isInvited && <span className="invite">초대</span>}
          </GridItem>
        ))}
        {!editActive ? (
          <GridItem onClick={() => navigate("/space/addspace")}>
            <img src={add} />
          </GridItem>
        ) : (
          <GridItem />
        )}
        {spaceInfoList.length < 9 &&
          Array.from({ length: 8 - spaceInfoList.length }).map((_, index) => (
            <GridItem key={`empty-${index}`} />
          ))}
      </GridContainer>
    </>
  );
};

export default SpacePage;
