## Summary

인증 상태 관리 로직을 개선하고 React Query의 Suspense 기능을 활용하여 로딩 상태를 더 효율적으로 처리하도록 수정했습니다.

## PR 유형 및 세부 작업 내용
- [x] 새로운 기능 추가
  - useAuthQuery 훅 추가: React Query를 활용한 인증 상태 관리
  - useAuthGuard 훅 추가: 컴포넌트 레벨에서의 인증 체크
  - AuthGuardProvider 추가: 전역 인증 상태 관리

- [x] 코드 리팩토링
  - useAuthRedirect 훅을 useAuthQuery를 사용하도록 수정
  - Suspense 위치를 Layout 컴포넌트로 이동
  - 인증 관련 로직을 더 명확하게 분리

- [x] 코드에 영향을 주지 않는 변경사항
  - 훅 이름 변경 및 구조 개선

## 주요 변경사항
1. 인증 상태 관리 개선
   - React Query의 Suspense 기능 활용
   - 전역 상태와 컴포넌트 레벨 인증 체크 분리
   - 더 효율적인 로딩 상태 처리

2. 코드 구조 개선
   - 인증 관련 로직을 명확하게 분리
   - 재사용 가능한 훅과 프로바이더 구현
   - 더 나은 타입 안정성

## 리뷰 요구사항
- 인증 상태 관리 방식이 적절한지 검토
- Suspense를 활용한 로딩 상태 처리 방식 검토
- 코드 구조와 네이밍이 명확한지 확인
