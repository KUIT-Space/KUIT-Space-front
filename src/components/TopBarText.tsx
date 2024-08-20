import { FC } from "react";
import { useNavigate } from "react-router-dom";

import back from "@/assets/icon_back.svg";
import logo from "@/assets/logo_space.svg";
import * as sty from "@/components/TopBarText.styled";

export enum LeftEnum {
  Logo = "logo",
  Back = "back",
  None = "none",
}

interface topbarProps {
  left: LeftEnum;
  center: string | React.ReactNode;
  right: string | React.ReactNode;
  rightHandler?: () => void;
  backHandler?: () => void;
  logoHandler?: () => void;
}

const TopBarText: FC<topbarProps> = ({
  left,
  center,
  right,
  rightHandler,
  backHandler,
  logoHandler,
}) => {
  const navigate = useNavigate();
  switch (left) {
    case "logo":
      return (
        <sty.StyledTopBarDiv>
          <sty.StyledLeftDiv
            onClick={() => {
              if (logoHandler) {
                logoHandler();
              } else {
                navigate("/");
              }
            }}
          >
            <img src={logo} alt="logo"></img>
          </sty.StyledLeftDiv>
          <sty.StyledCenterDiv>{center}</sty.StyledCenterDiv>
          <sty.StyledRightDiv
            onClick={() => {
              if (typeof rightHandler == "function") {
                rightHandler();
              }
            }}
          >
            <sty.StyledRightP>{right}</sty.StyledRightP>
          </sty.StyledRightDiv>
        </sty.StyledTopBarDiv>
      );

    case "back":
      return (
        <sty.StyledTopBarDiv>
          <sty.StyledLeftDiv
            onClick={() => {
              if (backHandler) {
                backHandler();
              } else {
                navigate(-1);
              }
            }}
          >
            <img src={back} alt="back"></img>
          </sty.StyledLeftDiv>
          <sty.StyledCenterDiv>
            <sty.StyledCenterP>{center}</sty.StyledCenterP>
          </sty.StyledCenterDiv>
          <sty.StyledRightDiv
            onClick={() => {
              if (typeof rightHandler == "function") {
                rightHandler();
              }
            }}
          >
            <sty.StyledRightP>{right}</sty.StyledRightP>
          </sty.StyledRightDiv>
        </sty.StyledTopBarDiv>
      );

    case "none":
      return (
        <sty.StyledTopBarDiv>
          <sty.StyledLeftDiv></sty.StyledLeftDiv>
          <sty.StyledCenterDiv>
            <sty.StyledCenterP>{center}</sty.StyledCenterP>
          </sty.StyledCenterDiv>
          <sty.StyledRightDiv
            onClick={() => {
              if (typeof rightHandler == "function") {
                rightHandler();
              }
            }}
          >
            <sty.StyledRightP>{right}</sty.StyledRightP>
          </sty.StyledRightDiv>
        </sty.StyledTopBarDiv>
      );
  }
};
export default TopBarText;
