import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

const TimePickerWrapper = styled.div`
  position: relative;
  display: inline-block;
`;

const PickerContainer = styled.div`
  display: flex;
  gap: 10px;
  color: ${({ theme }) => theme.colors.BG500};
  position: relative;
`;

const ScrollContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 60px;
  height: 160px;
  overflow: hidden;
  position: relative;
`;

const ScrollList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: transform 0.2s ease-out;
  will-change: transform;
  position: relative;
  padding-top: 60px;
  padding-bottom: 60px;
  z-index: 1;
`;

const HighlightOverlay = styled.div`
  position: absolute;
  top: 50%;
  left: 0;
  width: 100%;
  height: 30px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.colors.BG800};
  transform: translateY(-50%);
  pointer-events: none;
`;

const ScrollItem = styled.div`
  height: 40px;
  line-height: 40px;
  cursor: pointer;
`;

const TimeDisplay = styled.div`
  display: flex;
  padding: 10px;
  cursor: pointer;
  border-radius: 4px;
  text-align: center;
`;

const DisplayContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 120px;
`;

const TimePicker = ({ initialPeriod, initialHour, initialMinute }) => {
  const [period, setPeriod] = useState(initialPeriod);
  const [hour, setHour] = useState(initialHour);
  const [minute, setMinute] = useState(initialMinute);
  const [isOpen, setIsOpen] = useState(false);
  const pickerRef = useRef(null);

  const periods = ["오전", "오후"];
  const hours = Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, "0"));
  const minutes = Array.from({ length: 6 }, (_, i) => String(i * 10).padStart(2, "0"));

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleScroll = (type, value) => {
    switch (type) {
      case "period":
        setPeriod(value);
        break;
      case "hour":
        setHour(value);
        break;
      case "minute":
        setMinute(value);
        break;
    }
  };

  const handleWheel = (e, type, values) => {
    e.preventDefault();
    const currentValue = type === "period" ? period : type === "hour" ? hour : minute;
    const currentIndex = values.findIndex((val) => val === currentValue);
    // 순환 스크롤 적용
    const nextIndex =
      e.deltaY > 0
        ? (currentIndex + 1) % values.length // 마지막 요소 다음은 첫 요소
        : (currentIndex - 1 + values.length) % values.length; // 첫 요소 이전은 마지막 요소

    handleScroll(type, values[nextIndex]);

    // 아이템 순환되는거 만들어야 됨 (00 위에 55, 01 위에 12)
  };

  return (
    <TimePickerWrapper ref={pickerRef}>
      {isOpen ? (
        <PickerContainer>
          <ScrollContainer onWheel={(e) => handleWheel(e, "period", periods)}>
            <ScrollList style={{ transform: `translateY(-${periods.indexOf(period) * 40}px)` }}>
              {periods.map((p) => (
                <ScrollItem>{p}</ScrollItem>
              ))}
            </ScrollList>
          </ScrollContainer>
          <ScrollContainer onWheel={(e) => handleWheel(e, "hour", hours)}>
            <ScrollList style={{ transform: `translateY(-${hours.indexOf(hour) * 40}px)` }}>
              {hours.map((h) => (
                <ScrollItem>{h}</ScrollItem>
              ))}
            </ScrollList>
          </ScrollContainer>
          <ScrollContainer onWheel={(e) => handleWheel(e, "minute", minutes)}>
            <ScrollList style={{ transform: `translateY(-${minutes.indexOf(minute) * 40}px)` }}>
              {minutes.map((m) => (
                <ScrollItem>{m}</ScrollItem>
              ))}
            </ScrollList>
          </ScrollContainer>
          <HighlightOverlay />
        </PickerContainer>
      ) : (
        <TimeDisplay onClick={() => setIsOpen(!isOpen)}>
          <DisplayContainer>
            <ScrollItem>{period}</ScrollItem>
            <ScrollItem>{hour}</ScrollItem>
            <ScrollItem>{minute}</ScrollItem>
          </DisplayContainer>
        </TimeDisplay>
      )}
    </TimePickerWrapper>
  );
};

export default TimePicker;
