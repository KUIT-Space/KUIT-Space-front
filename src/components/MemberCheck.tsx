import { SpaceMemberDetail } from "@/apis/SpaceMember";
import * as s from "@/pages/PayPage/PayPage.styled";
import CheckBox from "./CheckBox";
import { styled } from "styled-components";

const MemberCheckWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  width: 100%;
  flex-grow: 1;
  padding: 0.5rem 0.25rem;
`;
export const MemberCheck = ({
  info,
  onClick,
}: {
  info: SpaceMemberDetail;
  onClick?: () => void;
}) => {
  return (
    <MemberCheckWrapper>
      <img
        style={{ width: "2.5rem", height: "2.5rem" }}
        src={info.profileImageUrl}
        referrerPolicy="no-referrer"
      />
      <span className="name" style={{ marginLeft: "1rem", width: "100%" }}>
        {info.nickname}
      </span>
      <CheckBox onClick={onClick} />
    </MemberCheckWrapper>
  );
};
