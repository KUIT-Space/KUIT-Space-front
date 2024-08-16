import TopBarText, { LeftEnum } from "@/components/TopBarText";
import styled from "styled-components";
import { ToggleBtn } from "@/components/ToggleBtn";
import { useState } from "react";

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
	const [alarms, setAlarms]= useState([
		{
				spaceImg: "https://placehold.co/40x40",
				spaceName: "스페이스 프로젝트",
				IsAlarmOn: true,
			},
			{
				spaceImg: "https://placehold.co/40x40",
				spaceName: "작업안하면 죽음",
				IsAlarmOn: false,
			},
			{
				spaceImg: "https://placehold.co/40x40",
				spaceName: "STACK",
				IsAlarmOn: true,
			},
			{
				spaceImg: "https://placehold.co/40x40",
				spaceName: "사담스페",
				IsAlarmOn: true,
			},
	])

	const handleToggleChange = (index: number) => {
		setAlarms((prevAlarms) => 
			prevAlarms.map((alarm, i) =>
				i === index ? { ...alarm, IsAlarmOn: !alarm.IsAlarmOn } : alarm
			)
		);
	};

	return (
		<div style={{ width: "320px", margin: "auto" }}>
			<TopBarText left={LeftEnum.Back} center="알림 관리" right="" />
			{alarms.map((alarm, index) => (
				<div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
				<AlarmContainer>
					<SpaceImg src={alarm.spaceImg} />
					{alarm.spaceName}
				</AlarmContainer>
				<ToggleBtn 
					isOn={alarm.IsAlarmOn}
					onToggle={()=>handleToggleChange(index)}
				/>
			</div>
			))}
		</div>
	);
};

export default AlarmManage;
