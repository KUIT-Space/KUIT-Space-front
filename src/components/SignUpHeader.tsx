import React from "react";
import styled from "styled-components";

import back from "@/assets/icon_back.svg";

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 3.25rem;
  padding: 0.5rem 0;
  position: relative;
  max-width: 40rem;
  margin: 0 auto;
`;

const Back = styled.button`
  position: absolute;
  left: 0.63rem;
  width: 2.25rem;
  height: 2.25rem;
  cursor: pointer;
`;

const Title = styled.div`
  color: #fff;
  font-family: Freesentation;
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 500;
  line-height: 120%;
  letter-spacing: 0.05rem;
`;

interface HeaderProps {
  title: string;
  onBackClick: () => void;
}

const SignUpHeader: React.FC<HeaderProps> = ({ title, onBackClick }) => {
  return (
    <HeaderContainer>
      <Back onClick={onBackClick}>
        <img src={back} alt="Back" />
      </Back>
      <Title>{title}</Title>
    </HeaderContainer>
  );
};

export default SignUpHeader;
