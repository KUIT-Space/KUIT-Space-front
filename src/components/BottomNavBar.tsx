import styled from "styled-components"

import board from "@/assets/icon_board.svg"
import chat from "@/assets/icon_chat.svg"
import home from "@/assets/icon_home.svg"
import pay from "@/assets/icon_pay.svg"
import voice from "@/assets/icon_voice.svg"

const StyledDiv = styled.div`
  width: 640px;
  padding: 10px;
  display: flex;
  justify-content: space-evenly;
  background-color: #222226;
`

const MenuDiv = styled.div`
  display:flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
const BottomNavBar = () => {
  return (
    <div style={{display:"flex", alignItems:"center", justifyContent:"center"}}>
      <StyledDiv>
        <MenuDiv><img src={voice} />보이스룸</MenuDiv>
        <MenuDiv><img src={chat} />채팅</MenuDiv>
        <MenuDiv><img src={home} />홈</MenuDiv>
        <MenuDiv><img src={pay} />정산</MenuDiv>
        <MenuDiv><img src={board} />게시판</MenuDiv>
      </StyledDiv>
    </div>
  )
}

export default BottomNavBar