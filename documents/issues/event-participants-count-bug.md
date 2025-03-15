## 어떤 버그인가요?
useEventsQuery에서 events.participants를 사용하여 현재 참가 인원을 표시하고 있으나, swagger.json에 따르면 API는 events.totalNumberOfParticipants를 반환합니다.

## 어떤 상황에서 발생한 버그인가요?
- QRHome 컴포넌트에서 useEventsQuery를 통해 이벤트 목록을 가져올 때, 각 이벤트의 참가자 수를 표시하기 위해 event.participants.length를 사용합니다.
- 그러나 swagger.json에 정의된 API 응답 구조에 따르면, 이벤트 목록 조회 API는 participants 배열이 아닌 totalNumberOfParticipants 필드를 반환합니다.
- 이로 인해 API 응답과 프론트엔드 코드 간의 불일치가 발생하여 참가자 수가 제대로 표시되지 않을 수 있습니다.

## 예상 결과
- API 응답 타입이 swagger.json과 일치하도록 수정되어야 합니다.
- 행사 참여 인원 수를 표시할 때 events.participants.length 대신 events.totalNumberOfParticipants를 사용해야 합니다.

## 참고할만한 자료(선택)
- swagger.json에 정의된 EventInfoResponse 타입:
```json
"EventInfoResponse": {
  "type": "object",
  "properties": {
    "id": {"type": "integer", "format": "int64"},
    "name": {"type": "string"},
    "image": {"type": "string"},
    "date": {"type": "string", "format": "date-time"},
    "startTime": {"type": "string", "format": "date-time"},
    "endTime": {"type": "string", "format": "date-time"},
    "totalNumberOfParticipants": {"type": "integer", "format": "int32"}
  }
}
```

- 현재 프론트엔드 코드에서 정의된 ReadEventInfoResponse 타입:
```typescript
export interface ReadEventInfoResponse {
  id: number;
  name: string;
  image: string;
  date: string;
  startTime: string;
  endTime: string;
  participants: EventParticipantInfo[];
}
```

- 수정이 필요한 파일:
  - src/apis/event/index.ts
  - src/pages/QRPage/QRHome.tsx
  - src/pages/QRPage/QRDetail.tsx
