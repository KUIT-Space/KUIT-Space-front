import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { choseongIncludes, hangulIncludes } from "es-hangul";

import { Chatroom, ChatroomInviteUserApi, ChatroomSearchAllUserApi, User } from "@/apis";
import { spaceSearchAllUserApi } from "@/apis/Space/SpaceSearchAllUserApi";
import { BottomBtn } from "@/components/BottomBtn";
import CheckBox from "@/components/CheckBox";
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

  useEffect(() => {
    //스페이스 전체멤버 목록 API 호출
    const spaceId = Number(localStorage.getItem("spaceId"));
    spaceSearchAllUserApi(spaceId).then((res) => {
      if (res) {
        const allSpaceUserList = res.result.userInfoInSpaceList;

        //userList 조회 API 호출 (채팅방에 있는 멤버 목록)
        ChatroomSearchAllUserApi(spaceId, chatroomInfo.id).then((res) => {
          if (res) {
            const chatRoomUserList = res.result.userList.map((user) => user.userId);

            //채팅방에 있는 멤버를 제외하도록 필터링
            const nonChatRoomUserList = allSpaceUserList.filter(
              (member) => !chatRoomUserList.includes(member.userId),
            );
            setUserList(nonChatRoomUserList);
          }
        });
      } else {
        setUserList([]);
      }
    });

    setInvitedMemberList([]);
  }, [chatroomInfo.id]);

  return (
    <>
      <TopBarText left={LeftEnum.Back} center={`${chatroomInfo.name} 채팅방 초대`} right="" />

      <MemberContainer $isBottomBtn>
        <div className="input--container">
          <p>
            <span className="invite title">멤버 초대</span>
            <span className="invite member--number">{invitedMemberList.length}</span>
          </p>
          <InviteInput
            onChange={(e) => setSearchWord(e.target.value)}
            placeholder="이름으로 검색해 보세요"
          />
        </div>

        {userList
          .filter(
            (member) =>
              hangulIncludes(member.userName, searchWord) ||
              choseongIncludes(member.userName, searchWord),
          )
          .map((member, index) => (
            <Member
              key={index}
              $onClickBackColor
              onClick={(e) => {
                e.preventDefault();

                invitedMemberList.some((invitedMember) => invitedMember.userId === member.userId)
                  ? setInvitedMemberList(
                      invitedMemberList.filter(
                        (invitedMember) => invitedMember.userId !== member.userId,
                      ),
                    )
                  : setInvitedMemberList([...invitedMemberList, member]);
              }}
            >
              <section>
                <img src={member.profileImgUrl ?? getUserDefaultImageURL(member.userId)} />
                <span className="name">{member.userName}</span>
                {member.userAuth === "manager" && <span className="admin">관리자</span>}
              </section>
              <CheckBox
                checked={invitedMemberList.some(
                  (invitedMember) => invitedMember.userId === member.userId,
                )}
              />
            </Member>
          ))}

        <BottomBtn
          onClick={() => {
            //초대하기 API 호출
            const spaceId = Number(localStorage.getItem("spaceId"));
            ChatroomInviteUserApi(
              spaceId,
              chatroomInfo.id,
              invitedMemberList.map((member) => member.userId),
            ).then((res) => {
              if (res) {
                console.log(res);
                navigate(`/chat/${id}/setting/member`, { state: { chatroomInfo }, replace: true });
                navigate(-1);
              }
            });
          }}
        >
          초대하기
        </BottomBtn>
      </MemberContainer>
    </>
  );
};

export default ChatSettingInvitePage;
