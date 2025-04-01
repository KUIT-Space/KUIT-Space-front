## Summary
인증 시스템을 Zustand를 사용하여 완전히 리팩토링했습니다. 기존의 단순한 토큰 관리에서
스페이스 정보를 포함한 인증 시스템으로 개선되었습니다. 주요 변경사항은 다음과 같습니다:

1. Zustand를 사용한 상태 관리 시스템 도입
2. 토큰 관리 로직을 authSlice로 분리
3. OAuth 로그인 시 스페이스 정보 처리 추가
4. 스토리지 초기화 및 관리 개선

## PR 유형 및 세부 작업 내용
- [x] 코드 리팩토링
  - Zustand store 구현 및 TypeScript 적용
  - authStore를 slice 패턴으로 변환
  - OAuth 응답 타입을 swagger specification에 맞게 수정
  - `TokenResult` 인터페이스를 `OauthLoginResponse`로 변경
  - `SpaceInfo` 타입 import 추가
  - 토큰 관리 로직을 authSlice로 이동
  - useAuthQuery 리팩토링 및 쿼리 무효화 로직 개선

- [x] 새로운 기능 추가
  - Zustand devtools/persist 미들웨어 추가
  - 로그인 시 스페이스 정보 저장 기능 추가
  - `login` 대신 `loginWithSpaces` 사용하여 스페이스 정보 처리
  - 스토리지 초기화 기능 추가
  - 스토리지 소비량 에러 처리 추가

- [x] 버그 수정
  - 구조 분해 할당 문법 오류 수정
  - 조건문 문법 오류 수정

- [x] 코드에 영향을 주지 않는 변경사항
  - 타입 시그니처 업데이트
  - 함수 선언 방식 개선
  - store 이름 변경

## test 완료 여부
- [x] OAuth 로그인 테스트 완료
- [x] 스페이스 정보 저장 테스트 완료
- [x] 타입 체크 완료
- [x] Zustand store 동작 테스트
- [x] 스토리지 초기화 테스트
- [x] 토큰 관리 테스트

## 리뷰 요구사항
- [ ] Zustand store 구조가 적절한지 확인
- [ ] OAuth 응답 타입 변경이 적절한지 확인
- [ ] 스페이스 정보 저장 로직이 올바른지 검증
- [ ] 에러 처리 로직 검토
- [ ] 스토리지 관리 방식 검토
- [ ] 타입 정의의 적절성 검토
