import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import { Chatroom, ChatroomSearchAllUserApi, User } from "@/apis";
import { spaceSearchAllUserApi } from "@/apis/Space/SpaceSearchAllUserApi";
import TopBarText, { LeftEnum } from "@/components/TopBarText";
import { getUserDefaultImageURL } from "@/utils/getUserDefaultImageURL";

import { InviteInput, Member, MemberContainer } from "../ChatCreatePage/ChatCreatePage.styled";

const ChatSettingInvitePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    state: { chatroomInfo },
  }: { state: { chatroomInfo: Chatroom } } = useLocation();

  const [userList, setUserList] = useState<User[]>([]);
  const [searchWord, setSearchWord] = useState<string>("");
  const [invitedMemberList, setInvitedMemberList] = useState<User[]>([]);

  // useEffect(() => {
  //   //userList 조회 API 호출
  //   const spaceId = Number(localStorage.getItem("spaceId"));
  //   ChatroomSearchAllUserApi(spaceId, chatroomInfo.id).then((res) => {
  //     console.log(res);
  //     if (res) {
  //       setUserList(res.result.userList);
  //     }
  //   });
  // }, [chatroomInfo.id]);

  useEffect(() => {
    //멤버 목록 API 호출
    const spaceId = Number(localStorage.getItem("spaceId"));
    spaceSearchAllUserApi(spaceId).then((res) => {
      res ? setUserList(res.result.userInfoInSpaceList) : setUserList([]);
    });

    setInvitedMemberList([]);
  }, []);

  return (
    <>
      <TopBarText left={LeftEnum.Back} center={`${chatroomInfo.name} 채팅방 초대`} right="" />

      <MemberContainer>
        <div className="input--container">
          <p>
            <span className="invite title">멤버 초대</span>
            <span className="invite member--number">{userList.length}</span>
          </p>
          <InviteInput
            onChange={(e) => setSearchWord(e.target.value)}
            placeholder="이름으로 검색해 보세요"
          />
        </div>

        {/* //TODO: 자신이 관리자일 때만 뜨는 뷰 */}
        <Member
          $onClickBackColor={true}
          onClick={() =>
            navigate(`/chat/${id}/setting/invite`, { state: { chatroomInfo: chatroomInfo } })
          }
        >
          <section>
            <span className="name">채팅방에 초대하기</span>
          </section>
        </Member>

        {userList.map((member, index) => (
          <Member key={index} $cursor="default">
            <section>
              <img src={member.profileImgUrl ?? getUserDefaultImageURL(member.userId)} />
              <span className="name">{member.userName}</span>
              {member.userAuth === "manager" && <span className="admin">관리자</span>}
            </section>
          </Member>
        ))}
      </MemberContainer>
    </>
  );
};

export default ChatSettingInvitePage;
