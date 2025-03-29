## Summary

게시판(board) 관련 API 함수 및 React Query hooks 구현

Swagger API 명세를 기반으로 게시판 생성, 게시글 목록 조회, 게시글 작성 기능을 제공하는 API 함수와 React Query hooks를 구현했습니다. 기존 event API 구현 패턴을 따라 일관성 있게 구현하였습니다.

## PR 유형 및 세부 작업 내용

- [x] 새로운 기능 추가

- Board API 관련 타입 정의 추가
  - 게시판 생성 요청/응답 타입
  - 게시글 목록 조회 응답 타입
  - 게시글 작성 요청/응답 타입

- Board API 함수 및 React Query hooks 구현
  - 게시판 생성 API 및 mutation hook
  - 게시글 목록 조회 API 및 query hook
  - 게시글 작성 API 및 mutation hook

- 모든 타입 및 hooks에 JSDoc 주석 추가로 개발자 경험 향상

## 테스트 완료 여부

API 함수 및 React Query hooks의 타입 검사 완료

## 작동 스크린샷

N/A - API 구현만 포함되어 있어 UI 변경사항 없음

## 리뷰 요구사항

- API 함수 구현이 Swagger 명세와 일치하는지 확인 부탁드립니다.
- React Query hooks 패턴이 기존 event API와 일관성 있게 구현되었는지 확인 부탁드립니다.
- 타입 정의가 적절한지 검토 부탁드립니다.
