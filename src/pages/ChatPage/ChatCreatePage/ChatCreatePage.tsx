import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { choseongIncludes, hangulIncludes } from "es-hangul";

import { ChatroomCreateApi } from "@/apis";
import { spaceSearchAllUserApi, UserInfoInSpace } from "@/apis/Space/SpaceSearchAllUserApi";
import { CharacterImgs } from "@/assets/Characters";
import ChatroomImg from "@/assets/ChatPage/btn_chatroom_img.svg";
import CheckBox from "@/components/CheckBox";
import { Input } from "@/components/Input";
import TopBarText, { LeftEnum } from "@/components/TopBarText";
import {
  ChatCreateBottomBtn,
  ChatCreateContainer,
  ChatroomAddImgBtn,
  ChatroomName,
  InviteContainer,
  InviteInput,
  InviteSearchIcon,
  Member,
} from "@/pages/ChatPage/ChatCreatePage/ChatCreatePage.styled";
import { Explanation } from "@/pages/LoginPage/SignUpPage.styled";
import { getUserDefaultImageURL } from "@/utils/getUserDefaultImageURL";
import { svgComponentToFile } from "@/utils/svgComponentToFile";

const ChatCreatePage = () => {
  const navigate = useNavigate();
  const [name, setName] = useState<string>("");
  const [invitedMemberList, setInvitedMemberList] = useState<UserInfoInSpace[]>([]);
  const [memberList, setMemberList] = useState<UserInfoInSpace[]>([]);
  const [searchWord, setSearchWord] = useState<string>("");
  const [spaceId, setSpaceId] = useState<number>(3);

  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const defaultImage = svgComponentToFile(
    CharacterImgs[Math.floor(Math.random() * CharacterImgs.length)],
  );

  useEffect(() => {
    const spaceId_LS = localStorage.getItem("spaceId");

    if (spaceId_LS !== null) {
      setSpaceId(Number.parseInt(spaceId_LS));

      //멤버 목록 API 호출
      spaceSearchAllUserApi(Number.parseInt(spaceId_LS)).then((res) => {
        res ? setMemberList(res.result.userInfoInSpaceList) : setMemberList([]);
      });
    }

    setInvitedMemberList([]);
  }, []);

  const handleChatCreate = () => {
    //채팅방 생성 API 호출
    ChatroomCreateApi(
      spaceId,
      name,
      invitedMemberList.map((member) => member.userId),
      uploadedImage ?? defaultImage,
    ).then((res) => {
      if (res) {
        console.log("생성 완료: ", res);
        //navigate(`/chat/${res.result.chatRoomId}`); chatroomInfo state가 없어서 못 넘기나...ㅜㅠ
        navigate(`/chat`);
      }
    });
  };

  const handleImageImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const image = e.target.files?.[0];
    image && setUploadedImage(image);
  };

  const validateChatroomName = (name: string) => {
    return name.length >= 3 && name.length <= 15;
  };

  return (
    <>
      <TopBarText left={LeftEnum.Back} center="새 채팅방" right="" />

      <ChatroomAddImgBtn $backgroundImage={URL.createObjectURL(uploadedImage ?? defaultImage)}>
        <img src={ChatroomImg} alt="Chatroom Image" />
        <input type="file" accept="image/*" onChange={handleImageImport} />
      </ChatroomAddImgBtn>

      <ChatCreateContainer>
        <div className="input--container">
          <p>채팅방 이름</p>
          <ChatroomName $nameLength={name.length}>
            <Input
              placeholder="채팅방 이름"
              maxLength={15}
              onChange={(e) => {
                setName(e.target.value);
              }}
              style={{
                borderColor: validateChatroomName(name) ? "#48FFBD" : "#FF5656",
              }}
            />
            <span>{name.length} / 15</span>
          </ChatroomName>
          <Explanation $isValid={validateChatroomName(name)}>
            {!validateChatroomName(name) && <span>채팅방 이름은 3 ~ 15자 이어야 해요</span>}
          </Explanation>
        </div>
        <div className="input--container">
          <p>
            <span className="invite title">멤버 초대</span>
            <span className="invite member--number">{invitedMemberList.length}</span>
          </p>
          <InviteContainer>
            <InviteInput
              onChange={(e) => setSearchWord(e.target.value)}
              placeholder="이름으로 검색해 보세요"
            />
            <InviteSearchIcon />
          </InviteContainer>
        </div>
        <div className="input--container">
          <p>멤버 목록</p>
          {memberList
            .filter(
              (member) =>
                hangulIncludes(member.userName, searchWord) ||
                choseongIncludes(member.userName, searchWord),
            )
            .map((member, index) => (
              <Member
                key={index}
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
                  <img
                    src={member.profileImgUrl ?? getUserDefaultImageURL(member.userId)}
                    alt="member profile"
                  />
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
        </div>
        <ChatCreateBottomBtn
          onClick={handleChatCreate}
          disabled={name.length === 0 || invitedMemberList.length === 0}
        >
          생성하기
        </ChatCreateBottomBtn>
      </ChatCreateContainer>
    </>
  );
};

export default ChatCreatePage;
