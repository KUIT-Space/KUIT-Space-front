## Summary

이벤트 API 함수들에 대한 React Query mutation hooks를 추가했습니다. 이를 통해 이벤트 생성, 삭제, 참여, 참가자 추가/제거 등의 데이터 변경 작업을 React Query의 mutation 기능을 활용하여 처리할 수 있게 되었습니다.

## PR 유형 및 세부 작업 내용

- [x] 새로운 기능 추가

- 세부 내용:
  - 이벤트 API 함수들에 대한 React Query mutation hooks 추가
    - `useCreateEvent`: 이벤트 생성 mutation
    - `useDeleteEvent`: 이벤트 삭제 mutation
    - `useJoinEvent`: 이벤트 참여 mutation
    - `useAddEventParticipants`: 이벤트 참가자 추가 mutation
    - `useRemoveEventParticipants`: 이벤트 참가자 제거 mutation
  - 각 mutation에 적절한 query invalidation 로직 추가
    - 이벤트 목록에 영향을 주는 작업(생성, 삭제)은 목록 쿼리 무효화
    - 특정 이벤트에 영향을 주는 작업(참여, 참가자 추가/제거)은 해당 이벤트 상세 쿼리 무효화

## 테스트 완료 여부
- [ ] 각 api endpoint별로 테스트 필요

## 리뷰 요구사항
- mutation hook의 네이밍 컨벤션이 적절한지 검토 부탁드립니다.
- query invalidation 전략이 적절한지 검토 부탁드립니다.
