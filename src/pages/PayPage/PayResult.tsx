import * as s from "@/pages/PayPage/PayPage.styled";
import bell from "@/assets/PayPage/bell.svg";
import check from "@/assets/PayPage/check.svg";
import ReactImg from "@/assets/react.svg";

type PRtype = {
  image: string;
  name: string;
  amount: string;
  chk: boolean;
};
const PayResult = ({ props }: { props: PRtype }) => {
  return (
    <s.RowFlexDiv style={{ alignItems: "center", padding: "0.25rem" }}>
      <img src={ReactImg} width={"40px"} height={"40px"}></img>
      <s.ColumnFlexDiv style={{ marginLeft: "0.75rem", justifyContent: "left" }}>
        <s.TextDiv>{props.name}</s.TextDiv>
        <s.BoldText>{props.amount}</s.BoldText>
      </s.ColumnFlexDiv>
      <img
        src={props.chk ? check : bell}
        width={"36px"}
        height={"36px"}
        style={{ marginLeft: "auto" }}
      ></img>
    </s.RowFlexDiv>
  );
};

export default PayResult;
