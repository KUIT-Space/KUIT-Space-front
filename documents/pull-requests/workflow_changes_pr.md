## Summary
GitHub Actions workflow 설정 추가

- Storybook 테스트 자동화 워크플로우 추가
- PR과 main 브랜치에서의 테스트 자동화 구현

## PR 유형 및 세부 작업 내용
- [x] 테스트 추가, 테스트 리팩토링
  - Storybook 테스트 자동화 워크플로우 추가
  - PR 생성 및 main 브랜치 push 시 자동 테스트 실행

- [x] 빌드 부분 혹은 패키지 매니저 수정
  - Node.js 및 npm 캐시 설정 추가
  - Playwright 브라우저 자동 설치 설정

## 세부 작업 내용
1. Storybook 테스트 워크플로우 (.github/workflows/storybook-test.yml)
   - PR 및 main 브랜치 push 시 자동 테스트
   - Node.js 22 버전 사용
   - Playwright 브라우저 자동 설치
   - npm ci를 통한 의존성 설치
   - test-storybook:ci 스크립트 실행

2. 테스트 전략
   - PR 단계에서의 테스트로 품질 보장
   - main 브랜치 테스트는 안전장치로 활용(따라서 배포 workflow와 독립적으로 실행)

## 테스트 완료 여부
- [x] Storybook 테스트 자동화 검증
- [x] PR 및 main 브랜치 테스트 동작 확인
