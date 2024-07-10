import { FC } from "react"
import logo from "../assets/logo_space.svg"
import back from "../assets/icon_back.svg"
import * as sty from "../styles/TopBarTextStyles"
import '../index.css'
import { useNavigate } from "react-router-dom";




export enum LeftEnum {
    Logo = "logo",
    Back = "back",
    None = "none"
};

interface topbarProps {
    left: LeftEnum;
    center: string;
    right: string;
}

const TopBarText: FC<topbarProps> = ({ left, center, right }) => {
    const navigate = useNavigate();
    switch (left) {
        case "logo":
            return (
                <div>
                    <sty.StyledTopBarDiv>
                        <nav>
                            <sty.StyledLeftDiv onClick={() => { navigate('/') }} style={{ cursor: "pointer" }}>
                                <img src={logo} width="120px"></img>
                            </sty.StyledLeftDiv>
                        </nav>
                        <nav>
                            <sty.StyledCenterDiv>
                                <sty.StyledCenterP>{center}</sty.StyledCenterP>
                            </sty.StyledCenterDiv>
                        </nav>
                        <nav>
                            <sty.StyledRightDiv>
                                <sty.StyledRightP>{right}</sty.StyledRightP>
                            </sty.StyledRightDiv>
                        </nav>
                    </sty.StyledTopBarDiv>
                </div >
            );
        case "back":
            return (
                <div>
                    <sty.StyledTopBarDiv>
                        <sty.StyledLeftDiv onClick={() => { navigate(-1) }} style={{ cursor: "pointer" }} >
                            <img src={back} width="120px"></img>
                        </sty.StyledLeftDiv>
                        <sty.StyledCenterDiv>
                            <sty.StyledCenterP>{center}</sty.StyledCenterP>
                        </sty.StyledCenterDiv>
                        <sty.StyledRightDiv>
                            <sty.StyledRightP>{right}</sty.StyledRightP>
                        </sty.StyledRightDiv>
                    </sty.StyledTopBarDiv>
                </div>
            );
        case "none":
            return (
                <div>
                    <sty.StyledTopBarDiv>
                        <sty.StyledLeftDiv>
                        </sty.StyledLeftDiv>
                        <sty.StyledCenterDiv>
                            <sty.StyledCenterP>{center}</sty.StyledCenterP>
                        </sty.StyledCenterDiv>
                        <sty.StyledRightDiv>
                            <sty.StyledRightP>{right}</sty.StyledRightP>
                        </sty.StyledRightDiv>
                    </sty.StyledTopBarDiv>
                </div>
            )
    }

};
export default TopBarText;