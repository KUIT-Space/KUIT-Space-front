import { Link } from "react-router-dom";
import styled from "styled-components";
import TopBarText, { LeftEnum } from "@/components/TopBarText";

const LinkContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const HomePage = () => {
  return (
    <LinkContainer>
      <TopBarText left={LeftEnum.Logo} center="none" right="Right Text" />
      <h1>Home page link 모음 입니다</h1>
      <Link to="/voiceroom">voiceroom link</Link>
      <Link to="/chat">chatting room link</Link>
      <Link to="/space">space room link</Link>
    </LinkContainer>
  );
};

export default HomePage;
