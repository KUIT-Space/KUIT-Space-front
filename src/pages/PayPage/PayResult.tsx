import * as s from "@/pages/PayPage/PayPage.styled";
import bell from "@/assets/PayPage/bell.svg";
import check from "@/assets/PayPage/check.svg";
import ReactImg from "@/assets/react.svg";
import { payTargetInfoDtoList } from "./PayPage";

const PayResult = ({ props }: { props: payTargetInfoDtoList }) => {
  return (
    <s.RowFlexDiv style={{ alignItems: "center", padding: "0.25rem" }}>
      <img src={props.targetUserProfileImg} width={"40px"} height={"40px"}></img>
      <s.ColumnFlexDiv style={{ marginLeft: "0.75rem", justifyContent: "left" }}>
        <s.TextDiv>{props.targetUserName}</s.TextDiv>
        <s.BoldText>{props.requestAmount}</s.BoldText>
      </s.ColumnFlexDiv>
      <img
        src={props.isComplete ? check : bell}
        width={"36px"}
        height={"36px"}
        style={{ marginLeft: "auto" }}
      ></img>
    </s.RowFlexDiv>
  );
};

export default PayResult;
