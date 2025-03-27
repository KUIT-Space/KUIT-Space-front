import { ResponseOfTargetDetail } from "@/apis/Pay";
import bell from "@/assets/PayPage/bell.svg";
import check from "@/assets/PayPage/check.svg";
import * as s from "@/pages/PayPage/PayPage.styled";
import { getUserDefaultImageURL } from "@/utils/getUserDefaultImageURL";

import { addComma } from "./PayPage";

const PayResult = ({ props }: { props: ResponseOfTargetDetail | undefined }) => {
  if (props === undefined) {
    return <></>;
  }
  const price = addComma(props.requestedAmount);
  return (
    <s.RowFlexDiv style={{ alignItems: "center", padding: "0.25rem" }}>
      <img
        src={
          props.targetMemberProfileImageUrl
            ? props.targetMemberProfileImageUrl
            : getUserDefaultImageURL(props.targetMemberId)
        }
        width={"40px"}
        height={"40px"}
        alt="profile"
      />
      <s.ColumnFlexDiv style={{ marginLeft: "0.75rem", justifyContent: "start" }}>
        <s.TextDiv>{props.targetMemberName}</s.TextDiv>
        <s.BoldText style={{ textAlign: "start" }}>{price}원</s.BoldText>
      </s.ColumnFlexDiv>
      <img
        src={props.complete ? check : bell}
        width={"36px"}
        height={"36px"}
        style={{ marginLeft: "auto" }}
        alt="check"
      />
    </s.RowFlexDiv>
  );
};

export default PayResult;
