import { useEffect, useState } from "react";
import { choseongIncludes, hangulIncludes } from "es-hangul";

import { spaceSearchAllUserApi, UserInfoInSpace } from "@/apis/SpaceSearchAllUserApi";
import ChatroomImg from "@/assets/ChatPage/btn_chatroom_img.svg";
import CheckBox from "@/components/CheckBox";
import { Input } from "@/components/Input";
import TopBarText, { LeftEnum } from "@/components/TopBarText";

import {
  ChatCreateBottomBtn,
  ChatCreateContainer,
  ChatroomAddImgBtn,
  ChatroomName,
  InviteInput,
  Member,
} from "./ChatCreatePage.styled";

const ChatCreatePage = () => {
  const [nameLength, setNameLength] = useState<number>(0);
  const [invitedMemberList, setInvitedMemberList] = useState<UserInfoInSpace[]>([]);
  const [memberList, setMemberList] = useState<UserInfoInSpace[]>([]);
  const [searchWord, setSearchWord] = useState<string>("");

  useEffect(() => {
    // 임시로 LOCALSTORAGE에 spaceId 3으로 저장
    localStorage.setItem("spaceId", "3");
    //
    const spaceId = localStorage.getItem("spaceId");
    if (spaceId !== null) {
      //멤버 목록 API 호출
      spaceSearchAllUserApi(Number.parseInt(spaceId)).then((res) => {
        res ? setMemberList(res.result.userInfoInSpaceList) : setMemberList([]);
      });
    }
    setInvitedMemberList([]);
  }, []);

  // useEffect(() => {
  // 	console.log(invitedMemberList);
  // }, [invitedMemberList]);

  const handleChatCreate = () => {
    //채팅방 생성 API 호출
  };

  const [uploadedImage, setUploadedImage] = useState<string | null>();

  const handleImageImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    const imageUrl = files && URL.createObjectURL(files[0]);
    setUploadedImage(imageUrl);
  };

  return (
    <>
      <TopBarText left={LeftEnum.Back} center="새 채팅방" right="" />
      <ChatroomAddImgBtn $backgroundImage={uploadedImage}>
        <img src={ChatroomImg} />
        <input type="file" accept="image/*" onChange={handleImageImport} />
      </ChatroomAddImgBtn>
      <ChatCreateContainer>
        <div className="input--container">
          <p>채팅방 이름</p>
          <ChatroomName $nameLength={nameLength}>
            <Input
              placeholder="채팅방 이름"
              maxLength={15}
              onChange={(e) => {
                setNameLength(e.target.value.length);
              }}
            />
            <span>{nameLength} / 15</span>
          </ChatroomName>
        </div>
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
                  <img src={member.profileImgUrl ?? ""} />
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
          disabled={nameLength === 0 || invitedMemberList.length === 0}
        >
          생성하기
        </ChatCreateBottomBtn>
      </ChatCreateContainer>
    </>
  );
};

export default ChatCreatePage;
