import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

import { Chatroom, ChatroomSearchAllUserApi, spaceSearchAllUserApi, User } from "@/apis";
import AddMemberImg from "@/assets/ChatPage/btn_add_member.svg";
import TopBarText, { LeftEnum } from "@/components/TopBarText";
import { Member, MemberContainer } from "@/pages/ChatPage/ChatCreatePage/ChatCreatePage.styled";
import * as s from "@/pages/HomePage/HomePage.styled";
import { getUserDefaultImageURL } from "@/utils/getUserDefaultImageURL";
import { useAllMembersQuery } from "@/apis/SpaceMember";
import { SPACE_ID } from "@/utils/constants";

const HomePageMemberPage = () => {
  const navigate = useNavigate();
  const { data } = useAllMembersQuery(SPACE_ID);
  if (data.result === undefined) {
    return <>에러 발생</>;
  }
  const members = data.result.spaceMemberDetails;

  // const [userList, setUserList] = useState<User[]>([]);

  // useEffect(() => {
  //   //userList 조회 API 호출
  //   const spaceId = Number(localStorage.getItem("spaceId"));
  //   spaceSearchAllUserApi(spaceId).then((res) => {
  //     if (res) {
  //       setUserList(res.result.userInfoInSpaceList);
  //     }
  //   });
  // }, []);

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
              {members.length}
            </span>
          </div>
        }
        right=""
      />

      <MemberContainer>
        {/* //TODO: 자신이 관리자일 때만 뜨는 뷰 */}
        {/* <s.RowFlexDiv
          onClick={clickInviteHandler}
          style={{ alignItems: "center", padding: "1rem 0rem 1rem 0rem", cursor: "pointer" }}
        >
          <img src={AddMemberImg} width={"40px"} height={"40px"} alt="add member" />
          <div style={{ marginLeft: "1rem" }}>스페이스에 초대하기</div>
        </s.RowFlexDiv> */}
        {members.map((member, index) => (
          <Member key={member.spaceMemberId}>
            <section>
              <img src={member.profileImageUrl} />
              <span className="name">{member.nickname}</span>
            </section>
          </Member>
        ))}
      </MemberContainer>
    </>
  );
};

export default HomePageMemberPage;
