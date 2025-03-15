## Summary

이벤트 참가자 수 표시 버그를 수정했습니다. useEventsQuery에서 events.participants.length를 사용하여 현재 참가 인원을 표시하고 있었으나, swagger.json에 따르면 API는 events.totalNumberOfParticipants를 반환합니다. 이로 인해 API 응답과 프론트엔드 코드 간의 불일치가 발생하여 참가자 수가 제대로 표시되지 않았습니다.


## PR 유형 및 세부 작업 내용

- [x] 버그 수정

### 세부 내용
1. `src/apis/event/index.ts` 파일에서 `EventInfoResponse` 인터페이스에 `totalNumberOfParticipants` 필드 추가
2. `ReadEventsResponse` 인터페이스가 `EventInfoResponse`를 사용하도록 수정
3. `QRHome.tsx` 컴포넌트에서 `event.participants.length` 대신 `event.totalNumberOfParticipants`를 사용하도록 수정
4. `QRDetail.tsx` 컴포넌트는 `useEventQuery`를 사용하여 단일 이벤트 정보를 가져오며, 이는 `participants` 배열을 포함하는 `ReadEventInfoResponse`를 반환하므로 수정이 필요하지 않음을 확인

## 테스트 완료 여부
- [x] QRHome 페이지에서 이벤트 참가자 수가 올바르게 표시되는지 확인
- [x] QRDetail 페이지에서 참가자 목록과 수가 올바르게 표시되는지 확인

## 리뷰 요구사항
- API 응답 타입과 프론트엔드 코드 간의 일치성 확인
- 참가자 수 표시 로직의 정확성 확인
