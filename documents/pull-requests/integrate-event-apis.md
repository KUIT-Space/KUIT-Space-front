# Event APIs Integration

## Overview
이 문서는 이벤트 API와 React Query를 통합하는 과정을 설명합니다. 이벤트 관련 기능을 위한 API 함수들과 React Query hooks를 구현했습니다.

## 구현된 API 함수 및 Hooks

### 조회 API (Query)
- `getEvents` / `useEventsQuery`: 스페이스의 모든 이벤트 목록 조회
- `getEvent` / `useEventQuery`: 특정 이벤트의 상세 정보 조회

### 변경 API (Mutation)
- `createEvent` / `useCreateEvent`: 새 이벤트 생성
- `deleteEvent` / `useDeleteEvent`: 이벤트 삭제
- `joinEvent` / `useJoinEvent`: 이벤트 참여
- `addEventParticipants` / `useAddEventParticipants`: 이벤트 참가자 추가
- `removeEventParticipants` / `useRemoveEventParticipants`: 이벤트 참가자 제거

## Query Invalidation 전략
- 이벤트 목록에 영향을 주는 작업(생성, 삭제)은 목록 쿼리 무효화
- 특정 이벤트에 영향을 주는 작업(참여, 참가자 추가/제거)은 해당 이벤트 상세 쿼리 무효화

## 사용 예시

```tsx
// 이벤트 생성
const { mutate: createEvent, isPending: isCreating } = useCreateEvent(spaceId);
createEvent(newEventData);

// 이벤트 삭제
const { mutate: deleteEvent } = useDeleteEvent(spaceId);
deleteEvent(eventId);

// 이벤트 참여
const { mutate: joinEvent } = useJoinEvent(spaceId, eventId);
joinEvent();

// 이벤트 참가자 추가
const { mutate: addParticipants } = useAddEventParticipants(spaceId, eventId);
addParticipants(memberIds);

// 이벤트 참가자 제거
const { mutate: removeParticipants } = useRemoveEventParticipants(spaceId, eventId);
removeParticipants(memberIds);
```
