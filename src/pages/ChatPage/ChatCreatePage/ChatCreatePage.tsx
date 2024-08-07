import { useEffect, useState } from "react";
import { choseongIncludes, hangulIncludes } from "es-hangul";

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

interface member {
  userId: number;
  name: string;
  isAdmin: boolean;
  profileImg: string;
}

const ChatCreatePage = () => {
  const [nameLength, setNameLength] = useState<number>(0);
  const [invitedMemberList, setInvitedMemberList] = useState<member[]>([]);
  const [memberList, setMemberList] = useState<member[]>([]);
  const [searchWord, setSearchWord] = useState<string>("");

  useEffect(() => {
    setMemberList([
      { userId: 1, name: "홍길동", isAdmin: false, profileImg: "https://placehold.co/100x100" },
      { userId: 2, name: "김길동", isAdmin: false, profileImg: "https://placehold.co/100x100" },
      { userId: 3, name: "박길동", isAdmin: true, profileImg: "https://placehold.co/40x40" },
      { userId: 4, name: "그린조아", isAdmin: true, profileImg: "https://placehold.co/100x100" },
      { userId: 5, name: "그린안조아", isAdmin: true, profileImg: "https://placehold.co/100x100" },
      { userId: 6, name: "그린조아", isAdmin: false, profileImg: "https://placehold.co/100x100" },
      { userId: 7, name: "greenjoa", isAdmin: false, profileImg: "https://placehold.co/100x100" },
      {
        userId: 8,
        name: "blue an joa",
        isAdmin: false,
        profileImg: "https://placehold.co/100x100",
      },
    ]);
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
                hangulIncludes(member.name, searchWord) ||
                choseongIncludes(member.name, searchWord),
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
                  <img src={member.profileImg} />
                  <span className="name">{member.name}</span>
                  {member.isAdmin && <span className="admin">관리자</span>}
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
