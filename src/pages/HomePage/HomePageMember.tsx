import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import { Chatroom, ChatroomSearchAllUserApi, User, spaceSearchAllUserApi } from "@/apis";
import AddMemberImg from "@/assets/ChatPage/btn_add_member.svg";
import TopBarText, { LeftEnum } from "@/components/TopBarText";
import { Member, MemberContainer } from "@/pages/ChatPage/ChatCreatePage/ChatCreatePage.styled";
import { getUserDefaultImageURL } from "@/utils/getUserDefaultImageURL";

const HomePageMemberPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [userList, setUserList] = useState<User[]>([]);

  useEffect(() => {
    //userList 조회 API 호출
    const spaceId = Number(localStorage.getItem("spaceId"));
    spaceSearchAllUserApi(spaceId).then((res) => {
      if (res) {
        setUserList(res.result.userInfoInSpaceList);
      }
    });
  }, []);

  return (
    <>
      <TopBarText
        left={LeftEnum.Back}
        center={
          <div>
            <span>스페이서</span>
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

        {userList.map((member, index) => (
          <Member
            key={member.userId}
            $cursor="pointer"
            onClick={() => {
              navigate(`/member/${member.userId}`);
            }}
          >
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

export default HomePageMemberPage;
