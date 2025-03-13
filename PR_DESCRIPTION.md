## Summary

HTTP 에러 처리를 위한 커스텀 에러 핸들링 시스템을 구현했습니다. 특히 401 Unauthorized 에러에 초점을 맞추어, 사용자가 인증되지 않은 상태에서 API 요청을 할 경우 기본 React Router 에러 UI 대신 자동으로 Discord 로그인 페이지로 리다이렉트되도록 했습니다.

이 구현은 에러 상태 코드에 따른 패턴 매칭을 위해 ts-pattern을 사용하고, 컴포넌트 레벨에서 에러를 캐치하고 처리하기 위해 react-error-boundary를 사용했습니다.

## PR 유형 및 세부 작업 내용

- [x] 새로운 기능 추가
- [x] 코드 리팩토링
- [x] 테스트 추가, 테스트 리팩토링
- [x] 빌드 부분 혹은 패키지 매니저 수정

### 세부 내용

1. 패키지 설치
   - ts-pattern: HTTP 에러 상태 코드에 따른 패턴 매칭을 위해 설치
   - react-error-boundary: 컴포넌트 레벨에서 에러 처리를 위해 설치

2. 커스텀 에러 클래스 정의
   - UnauthorizedError 클래스 생성 (401 에러 처리용)
   - ky의 HTTPError를 상속하여 기존 에러 처리와 호환성 유지

3. ky 클라이언트 설정 업데이트
   - beforeError 훅에서 ts-pattern을 사용하여 HTTP 에러 상태 코드에 따라 처리
   - 401 에러 발생 시 UnauthorizedError로 변환

4. GlobalErrorFallback 컴포넌트 생성
   - 에러 유형에 따른 UI 표시
   - UnauthorizedError 발생 시 /discordlogin으로 리다이렉트
   - 스타일드 컴포넌트를 사용하여 UI 구현

5. App.tsx에 ErrorBoundary 통합
   - react-error-boundary의 ErrorBoundary로 애플리케이션 래핑
   - GlobalErrorFallback을 FallbackComponent로 설정

6. 테스트 추가
   - GlobalErrorFallback 컴포넌트에 대한 스토리북 스토리 추가
   - 다양한 에러 시나리오 테스트 (일반 에러, HTTP 에러, 인증 에러)
