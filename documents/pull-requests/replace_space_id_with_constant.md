## Summary
하드코딩된 space ID 값(1과 3)을 중앙 집중식 SPACE_ID 상수로 대체하는 작업을 수행했습니다. 이를 통해 향후 space ID 값을 변경해야 할 경우 코드베이스 전체에서 모든 인스턴스를 찾아 수정하는 대신 한 곳에서만 수정하면 되므로 유지보수성이 향상됩니다.

## PR 유형 및 세부 작업 내용
- [x] 코드 리팩토링

### 세부 내용
1. 새로운 상수 파일 생성 (`src/utils/constants.ts`)에 SPACE_ID 상수 정의 (값: 3)
   - 애플리케이션 전체에서 사용할 수 있는 중앙 집중식 상수 파일 생성

2. 하드코딩된 space ID 값 3을 SPACE_ID 상수로 대체:
   - `src/pages/ChatPage/ChattingPage/ChattingPage.tsx`
     - `const spaceId = Number(localStorage.getItem("spaceId")) || 3;` → `const spaceId = Number(localStorage.getItem("spaceId")) || SPACE_ID;`
   - `src/pages/ChatPage/ChatCreatePage/ChatCreatePage.tsx`
     - `const [spaceId, setSpaceId] = useState<number>(3);` → `const [spaceId, setSpaceId] = useState<number>(SPACE_ID);`
   - `src/pages/VoiceRoomPage/EditVoiceRoomPage.tsx`
     - `VrEditApi(3, newRoomInfo)` → `VrEditApi(SPACE_ID, newRoomInfo)`
   - `src/pages/BoardPage/BoardRegisterPage/BoardRegisterPage.tsx`
     - `Number.parseInt(spaceId) || 3,` → `Number.parseInt(spaceId) || SPACE_ID,`
   - `src/pages/PayPage/ReqDataDiv.tsx`에서 사용되지 않는 `const spaceID = 3;` 변수 제거

3. 하드코딩된 space ID 값 1을 SPACE_ID 상수로 대체:
   - `src/pages/QRPage/QRPage.tsx`
     - `const { mutate: joinEvent } = useJoinEvent(1, Number(id));` → `const { mutate: joinEvent } = useJoinEvent(SPACE_ID, Number(id));`
     - `const { data } = useEventQuery(1, Number(id), { refetchInterval: 10000 });` → `const { data } = useEventQuery(SPACE_ID, Number(id), { refetchInterval: 10000 });`
   - `src/pages/QRPage/QRDetail.tsx`
     - `const { data } = useEventQuery(1, Number(id), { refetchInterval: 10000 });` → `const { data } = useEventQuery(SPACE_ID, Number(id), { refetchInterval: 10000 });`
   - `src/pages/QRPage/QRHome.tsx`
     - `const { mutate: deleteEvent } = useDeleteEvent(1);` → `const { mutate: deleteEvent } = useDeleteEvent(SPACE_ID);`
     - `const { data } = useEventsQuery(1, { refetchInterval: 10000 });` → `const { data } = useEventsQuery(SPACE_ID, { refetchInterval: 10000 });`

이 변경으로 코드의 일관성이 향상되고, 향후 space ID 값을 변경해야 할 경우 한 곳에서만 수정하면 되므로 유지보수가 용이해집니다. 또한 QR 페이지에서 사용하던 space ID 값 1을 프로젝트 전체에서 사용하는 값 3으로 통일하여 일관성을 높였습니다.
