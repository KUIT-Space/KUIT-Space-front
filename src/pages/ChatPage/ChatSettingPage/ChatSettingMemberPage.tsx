import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import { Chatroom, ChatroomSearchAllUserApi, User } from "@/apis";
import AddMemberImg from "@/assets/ChatPage/btn_add_member.svg";
import CheckBox from "@/components/CheckBox";
import TopBarText, { LeftEnum } from "@/components/TopBarText";
import { Member, MemberContainer } from "@/pages/ChatPage/ChatCreatePage/ChatCreatePage.styled";
import { getUserDefaultImageURL } from "@/utils/getUserDefaultImageURL";

const ChatSettingMemberPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    state: { chatroomInfo },
  }: { state: { chatroomInfo: Chatroom } } = useLocation();

  const [userList, setUserList] = useState<User[]>([]);

  useEffect(() => {
    //userList 조회 API 호출
    const spaceId = Number(localStorage.getItem("spaceId"));
    ChatroomSearchAllUserApi(spaceId, chatroomInfo.id).then((res) => {
      console.log(res);
      if (res) {
        setUserList(res.result.userList);
      }
    });
  }, [chatroomInfo.id]);

  return (
    <>
      <TopBarText
        left={LeftEnum.Back}
        center={
          <div>
            <span>{chatroomInfo.name} 채팅방 멤버</span>
            <span
              style={{
                marginLeft: "0.75rem",
                color: `#48FFBD`,
              }}
            >
              {userList.length}
            </span>
          </div>
        }
        right=""
      />

      <MemberContainer>
        {/* //TODO: 자신이 관리자일 때만 뜨는 뷰 */}
        <Member
          $onClickBackColor={true}
          onClick={() =>
            navigate(`/chat/${id}/setting/invite`, { state: { chatroomInfo: chatroomInfo } })
          }
        >
          <section>
            <img src={AddMemberImg} />
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

export default ChatSettingMemberPage;
