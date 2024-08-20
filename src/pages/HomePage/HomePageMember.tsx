import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import { Chatroom, ChatroomSearchAllUserApi, User, spaceSearchAllUserApi } from "@/apis";
import AddMemberImg from "@/assets/ChatPage/btn_add_member.svg";
import TopBarText, { LeftEnum } from "@/components/TopBarText";
import { Member, MemberContainer } from "@/pages/ChatPage/ChatCreatePage/ChatCreatePage.styled";
import { getUserDefaultImageURL } from "@/utils/getUserDefaultImageURL";
import * as s from "@/pages/HomePage/HomePage.styled";
import { ToastContainer, toast } from "react-toastify";

const HomePageMemberPage = () => {
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

  const clickInviteHandler = async () => {
    const spaceId = localStorage.getItem("spaceId");
    await navigator.clipboard
      .writeText(`${window.location.origin}/KUIT-Space-front/invite/${spaceId}`)
      .then(() => {
        toast.success("클립보드에 초대링크가 복사되었습니다!", {
          position: "bottom-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      });
  };
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
        <s.RowFlexDiv
          onClick={clickInviteHandler}
          style={{ alignItems: "center", padding: "1rem 0rem 1rem 0rem", cursor: "pointer" }}
        >
          <img src={AddMemberImg} width={"40px"} height={"40px"}></img>
          <div style={{ marginLeft: "1rem" }}>스페이스에 초대하기</div>
        </s.RowFlexDiv>
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
      <ToastContainer
        style={{ width: "50%", left: "50%", transform: "translateX(-50%)" }}
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  );
};

export default HomePageMemberPage;
