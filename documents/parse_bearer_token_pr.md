## Summary

Authorization 헤더에서 Bearer 토큰을 파싱하는 기능을 추가했습니다. 기존에는 "Bearer [token]" 형식의 헤더 값을 그대로 사용하고 있었으나, 실제 토큰 값만 추출하여 사용하도록 수정했습니다.

## PR 유형 및 세부 작업 내용

- [x] 버그 수정
- [x] 코드 리팩토링

- `parseBearerToken` 함수 추가: Authorization 헤더에서 "Bearer " 접두사를 제거하고 실제 토큰 값만 반환
- `exchangeCodeForTokens` 함수 수정: Authorization 및 refresh 토큰 헤더에서 Bearer 토큰을 파싱하도록 변경
- 기존 코드와의 호환성을 위해 "Bearer " 접두사가 없는 경우 원래 값을 그대로 반환하도록 구현

## test 완료 여부
- [x] 로컬 환경에서 OAuth 로그인 테스트 완료
- [x] 토큰 파싱 기능 정상 작동 확인

## 리뷰 요구사항
- Bearer 토큰 파싱 로직이 적절한지 확인 부탁드립니다.
- 기존 코드와의 호환성 측면에서 문제가 없는지 검토 부탁드립니다.
