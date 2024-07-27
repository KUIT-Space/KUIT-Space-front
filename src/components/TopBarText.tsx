import { FC } from "react";
import logo from "@/assets/logo_space.svg";
import back from "@/assets/icon_back.svg";
import * as sty from "@/components/TopBarText.styled";
import { useNavigate } from "react-router-dom";

export enum LeftEnum {
	Logo = "logo",
	Back = "back",
	None = "none",
}

interface topbarProps {
	left: LeftEnum;
	center: string;
	right: string;
	rightHandler?: Function;
}

const TopBarText: FC<topbarProps> = ({ left, center, right, rightHandler }) => {
	const navigate = useNavigate();
	switch (left) {
		case "logo":
			return (
				<sty.StyledTopBarDiv>
					<sty.StyledLeftDiv
						onClick={() => {
							navigate("/");
						}}
					>
						<img src={logo}></img>
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

		case "back":
			return (
				<sty.StyledTopBarDiv>
					<sty.StyledLeftDiv
						onClick={() => {
							navigate(-1);
						}}
					>
						<img src={back}></img>
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
