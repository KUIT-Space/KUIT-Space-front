import styled from "styled-components";

export const ContainerDiv = styled.div`
  display: flex;
  justify-content: center;
  margin: 1.25rem;
  flex-direction: column;
`;

export const RoundDiv = styled.div`
  margin: 0.75rem;
  padding: 0.75rem;

  border-radius: 0.75rem;
  background: var(--Foundation-Gray-gray800, #222226);
`;

export const ContentDiv = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1.25rem 1.5rem 1.25rem 1.5rem;

  border-radius: 0.75rem;
  background: var(--GRAY-900, #181818);
`;

export const TitleDiv = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;

  margin-bottom: 0.5938rem;
  margin-left: 0.5rem;
`;

export const TitleContentDiv = styled.div`
  color: #fff;

  /* text/Bold 18pt */
  font-family: Freesentation;
  font-size: 1.125rem;
  font-style: normal;
  font-weight: 700;
  line-height: 140%; /* 25.2px */
  letter-spacing: 0.045rem;
`;

export const PriceDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: end;
  margin-bottom: 0.5rem;
`;
export const NowPriceDiv = styled.div`
  color: #fff;
  font-family: Freesentation;
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 700;
  line-height: 100%; /* 20px */
  letter-spacing: 0.025rem;
`;
export const AllPriceDiv = styled.div`
  color: #fff;
  font-family: Freesentation;
  font-size: 0.75rem;
  font-style: normal;
  font-weight: 400;
  line-height: 100%; /* 12px */
  letter-spacing: 0.015rem;
`;

export const TextDiv = styled.div`
  color: var(--GRAY-400, #acacb5);

  /* text/Regular 14pt */
  font-family: Freesentation;
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 400;
  line-height: 140%; /* 19.6px */
  letter-spacing: 0.56px;
`;

export const ColumnFlexDiv = styled.div`
  display: flex;
  flex-direction: column;
`;
export const RowFlexDiv = styled.div`
  display: flex;
  flex-direction: row;
`;

export const ImgDiv = styled.div`
  position: absolute;
  top: 0.75rem;
  right: 0rem;
`;

export const GrayRoundDiv = styled.div`
  border-radius: 12px;
  background: var(--Foundation-Gray-gray700, #303036);

  padding: 0.875rem;
  margin: 0.75rem;
`;

export const GrayTextDiv = styled.div`
  color: var(--Foundation-Gray-gray500, #767681);

  /* text/Regular 14pt */
  font-family: Freesentation;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 140%; /* 19.6px */
  letter-spacing: 0.56px;
`;

export const GrayBTextDiv = styled.div`
  color: var(--Foundation-Gray-gray500, #767681);
  font-family: Freesentation;
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 700;
  line-height: 100%; /* 1.25rem */
  letter-spacing: 0.025rem;
`;

export const LargeTxt = styled.div`
  color: #fff;
  text-align: center;

  /* text/SemiBold 24pt */
  font-family: Freesentation;
  font-size: 1.5rem;
  font-style: normal;
  font-weight: 600;
  line-height: 140%; /* 2.1rem */
  letter-spacing: 0.03rem;
`;

export const CompletePayDiv = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 0.75rem;
  background: var(--Foundation-Gray-gray850, #1b1b1d);
`;

export const TabMenu = styled.ul`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin: 1.25rem;
  .submenu {
    display: flex;
    width: calc(100% / 2);
    padding: 0.75rem 0rem 0.75rem 0rem;
    color: var(--Foundation-Gray-gray500, #767681);

    /* text/Regular 14pt */
    font-family: Freesentation;
    font-size: 0.875rem;
    font-style: normal;
    font-weight: 400;
    line-height: 140%; /* 1.225rem */
    letter-spacing: 0.035rem;

    justify-content: center;
    cursor: pointer;
  }
  .focused {
    color: #fff;

    /* text/Medium 14pt */
    font-family: Freesentation;
    font-size: 0.875rem;
    font-style: normal;
    font-weight: 500;
    line-height: 140%; /* 1.225rem */
    letter-spacing: 0.035rem;

    border-bottom: 1px solid #48ffbd;
    justify-content: center;
    cursor: pointer;
  }
`;

export const BoldText = styled.div`
  color: var(--Foundation-Gray-white, #fff);
  text-align: center;

  /* text/Bold 16pt */
  font-family: Freesentation;
  font-size: 1rem;
  font-style: normal;
  font-weight: 700;
  line-height: 140%; /* 1.4rem */
  letter-spacing: 0.02rem;
`;

export const InputText = styled.input`
  border-radius: 0.75rem;
  background: var(--Foundation-Gray-gray800, #222226);

  border: none;
  width: 100%;
  padding: 1rem;
  color: var(--Foundation-Gray-gray500, #767681);

  /* text/Regular 16pt */
  font-family: Freesentation;
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;
  line-height: 140%; /* 1.4rem */
  letter-spacing: 0.04rem;

  &:focus {
    outline: none;
    box-shadow: 0rem 0rem 0.25rem var(--Foundation-Main-color-Normal, #48ffbd);
  }
`;

export const BankSelect = styled.select`
  width: 100%;
  padding: 1rem 1rem 1rem 0.75rem;
  margin-top: 0.75rem;
  border: none;

  color: var(--Foundation-Gray-gray500, #767681);
  border-radius: 0.75rem;
  background: var(--Foundation-Gray-gray800, #222226);
  /* text/Regular 16pt */
  font-family: Freesentation;
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;
  line-height: 140%; /* 1.4rem */
  letter-spacing: 0.04rem;
`;

export const BankOption = styled.option`
  border-radius: 0.75rem 0.75rem 0rem 0rem;
`;

export const RegularText = styled.div`
  color: var(--WHITE, #fff);

  /* text/Medium 16pt */
  font-family: Freesentation;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 140%; /* 22.4px */
  letter-spacing: 0.64px;
`;
