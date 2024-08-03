import TopBarText, { LeftEnum } from "@/components/TopBarText";
import styled from "styled-components";
import { ToggleBtn } from "@/components/ToggleBtn";

const AlarmContainer = styled.div`
	display: flex;
	height: 64px;
	align-items: center;
`;

const SpaceImg = styled.img`
	width: 40px;
	height: 40px;
	border-radius: 8px;
	margin-top: 12px;
	margin-right: 12px;
	margin-bottom: 12px;
`;

const AlarmManage = () => {
	return (
		<div style={{ width: "320px", margin: "auto" }}>
			<TopBarText left={LeftEnum.Back} center="알림 관리" right="" />
			<div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
				<AlarmContainer>
					<SpaceImg src="https://placehold.co/40x40" />
					스페이스 프로젝트
				</AlarmContainer>
				<ToggleBtn />
			</div>
			<div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
				<AlarmContainer>
					<SpaceImg src="https://placehold.co/40x40" />
					작업안하면죽음
				</AlarmContainer>
				<ToggleBtn />
			</div>
			<div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
				<AlarmContainer>
					<SpaceImg src="https://placehold.co/40x40" />
					STACK
				</AlarmContainer>
				<ToggleBtn />
			</div>
			<div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
				<AlarmContainer>
					<SpaceImg src="https://placehold.co/40x40" />
					사담스페
				</AlarmContainer>
				<ToggleBtn />
			</div>
		</div>
	);
};

export default AlarmManage;
