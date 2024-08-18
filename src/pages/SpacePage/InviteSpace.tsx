import { BottomBtn } from "@/components/BottomBtn";
import { To, useNavigate } from "react-router-dom";
import { ChangeEvent, useState } from "react";
import { Input } from "@/components/Input";
import camera from "@/assets/Space/icon_camera.svg";
import back from "@/assets/icon_back.svg";
import styled from "styled-components";

const TopBarContainer = styled.div`
    display: flex;
	height: 52px;
    align-items: center;
`;

const BackBtn = styled.img`
    width: 36px;
    height: 36px;
`;

const InfoContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 132px;
`;

const SpaceImage = styled.img`
    width: 160px;
    height: 160px;
    border-radius: 12px;
    margin-bottom: 20px;
`;

const SpaceTitle = styled.span`
    font-size: 24px;
    font-weight: semi-bold;
    margin-bottom: 20px;
`
const SpaceInfo = styled.span`
    height: 22px;
    font-size: 16px;
    color: ${({ theme }) => theme.colors.BG500};
`;

const Count = styled.span`
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  font-size: 16px;
  color: ${({ theme }) => theme.colors.BG500};
`;

const NameInput = styled(Input)`
  padding-right: 3rem; /* Count를 위한 여유 공간 */
  margin-top: 8px;
`;

const SpaceJoinBottomBtn = styled(BottomBtn)`
  display: fixed;
  width: 320px;
  bottom: 0;
  margin: 0;
`;


const InviteSpace : React.FC = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [spacename, setSpacename] = useState("");
    const maxChars = 12;

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (value.length <= maxChars) {
            setSpacename(value);
        }
    };
    
    const navigate = useNavigate();

    const handleNextButtonClick = () => {
        if(currentStep === 2) {
            // 이름 저장하는 기능 필요
            handleNavigate("/")
        };
		setCurrentStep((prevStep) => prevStep + 1);
	};
	
    const handlePreviousButtonClick = () => {
        setCurrentStep((prevStep) => prevStep - 1);
    };
    
    const handleNavigate = (path: To) => {
		navigate(path);
	};

    const tempJson = {
        image: "https://placehold.co/160x160",
        title: "작업 안하면 죽는 방",
        created: "2024년 06월 20일",
        members: 20
    }

    return (
        <div style={{ width: "320px", margin: "auto" }}>
            {currentStep === 1 && (
			    <InfoContainer>
                    <SpaceImage src={tempJson.image}/>
                    <SpaceTitle>{tempJson.title}</SpaceTitle>
                    <div>
                        <div>
                            <SpaceInfo style={{ marginRight: "12px" }}>개설일</SpaceInfo>
                            <SpaceInfo>{tempJson.created}</SpaceInfo>
                        </div>
                        <div>
                            <SpaceInfo style={{ marginRight: "12px" }}>멤버</SpaceInfo>
                            <SpaceInfo>{tempJson.members}명</SpaceInfo>
                        </div>
                    </div>
			    </InfoContainer>
	        )}
            {currentStep === 2 && (
                <div>
                    <TopBarContainer>
    		            <BackBtn src={back} onClick={handlePreviousButtonClick} />
		            </TopBarContainer>

                    <div style={{ marginTop: "16px" }}>
                        이름
                        <div style={{ position: "relative" }}>
                        <NameInput 
                            value={spacename}
                            onChange={handleInputChange}
                            placeholder="스페이스 이름"  
                        />
                        <Count>{spacename.length}/{maxChars}</Count>
                        </div>
                    </div>
                </div>
            )}
            <SpaceJoinBottomBtn 
                disabled={(currentStep === 2) && spacename === "" ? true : false} 
                onClick={handleNextButtonClick}>
                    가입하기
            </SpaceJoinBottomBtn>
        </div>
    )
};

export default InviteSpace;
