## Summary

API 요청 시 localStorage에 저장된 accessToken을 Authorization 헤더에 자동으로 주입하도록 수정했습니다. 이를 통해 인증이 필요한 API 요청 시 매번 수동으로 토큰을 헤더에 추가할 필요 없이 자동으로 처리됩니다.


## PR 유형 및 세부 작업 내용
- [x] 기능 추가

- client.ts 파일의 beforeRequest 훅에서 "Authorization" 대신 "accessToken"을 localStorage에서 가져오도록 수정
- 401 응답 시 "accessToken"을 localStorage에서 제거하도록 수정

## 테스트 완료 여부
- [x] API 요청 시 localStorage에 accessToken이 있을 경우 Authorization 헤더에 정상적으로 추가되는지 확인
- [x] 401 응답 시 localStorage에서 accessToken이 정상적으로 제거되는지 확인

## 리뷰 요구사항
- 다른 부분에서 localStorage의 "Authorization" 키를 사용하는 코드가 있는지 확인 필요
