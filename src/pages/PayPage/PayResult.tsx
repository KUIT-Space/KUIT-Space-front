import * as s from "@/pages/PayPage/PayPage.styled";
import bell from "@/assets/PayPage/bell.svg";
import check from "@/assets/PayPage/check.svg";
import ReactImg from "@/assets/react.svg";
import { addComma, payTargetInfoDtoList } from "./PayPage";
import { getUserDefaultImageURL } from "@/utils/getUserDefaultImageURL";

const PayResult = ({ props }: { props: payTargetInfoDtoList }) => {
  const price = addComma(props.requestAmount);
  return (
    <s.RowFlexDiv style={{ alignItems: "center", padding: "0.25rem" }}>
      <img
        src={
          props.targetUserProfileImg
            ? props.targetUserProfileImg
            : getUserDefaultImageURL(props.targetUserId)
        }
        width={"40px"}
        height={"40px"}
      ></img>
      <s.ColumnFlexDiv style={{ marginLeft: "0.75rem", justifyContent: "start" }}>
        <s.TextDiv>{props.targetUserName}</s.TextDiv>
        <s.BoldText style={{ textAlign: "start" }}>{price}원</s.BoldText>
      </s.ColumnFlexDiv>
      <img
        src={props.complete ? check : bell}
        width={"36px"}
        height={"36px"}
        style={{ marginLeft: "auto" }}
      ></img>
    </s.RowFlexDiv>
  );
};

export default PayResult;
