## Summary
GitHub Actions를 사용하여 Pull Request 시 자동으로 빌드와 린트를 실행하는 워크플로우를 추가했습니다. 이를 통해 코드 품질을 자동으로 검증하고, 빌드 오류를 조기에 발견할 수 있습니다.

## PR 유형 및 세부 작업 내용
- [x] 빌드 부분 혹은 패키지 매니저 수정
- [x] 코드에 영향을 주지 않는 변경사항(오타 수정, 탭 사이즈 변경, 변수명 변경)

- 세부 내용:
  1. `.github/workflows/build.yml` 추가
     - Pull Request 이벤트 발생 시 실행
     - Node.js v22.11.0 환경 설정
     - 의존성 설치 및 빌드 실행
  2. `.github/workflows/lint.yml` 추가
     - Pull Request 이벤트 발생 시 실행
     - Node.js v22.11.0 환경 설정
     - 의존성 설치 및 린트 실행

## test 완료 여부
- [x] GitHub Actions 워크플로우 테스트 완료
  - 빌드 워크플로우 실행 확인
  - 린트 워크플로우 실행 확인
