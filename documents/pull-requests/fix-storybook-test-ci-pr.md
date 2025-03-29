## Summary
<!-- 변경 사항 및 관련 이슈에 대해 간단하게 작성해주세요. 어떻게보다 무엇을 왜 수정했는지 설명해주세요. -->

GitHub Actions에서 Storybook 테스트 실행 시 발생하는 `__test is not defined` 오류를 해결하기 위해 필요한 패키지를 설치했습니다. 이는 Storybook 테스트 러너의 알려진 이슈로, 공식 문서에서 권장하는 정적 빌드 방식으로 테스트를 실행하기 위한 패키지들을 추가하고 test-storybook:ci 커맨드를 수정하여 해결했습니다.(https://github.com/storybookjs/test-runner/issues/68)

Storybook 공식 문서([Running against locally built Storybooks in CI](https://github.com/storybookjs/test-runner?tab=readme-ov-file#2-running-against-locally-built-storybooks-in-ci))에 따르면, CI 환경에서 Storybook 테스트를 안정적으로 실행하기 위해서는 정적 빌드 방식을 사용하는 것이 권장됩니다.

<!-- 연관된 이슈: #(Issue Number)  #15 와 같이 작성하면 됩니다.-->

## PR 유형 및 세부 작업 내용
<!-- 어떤 변경 사항이 있나요? 해당하는 줄 복붙하셔서 체크(x) 후 추가하면 됩니다 -->

- [x] 버그 수정
- [x] 빌드 부분 혹은 패키지 매니저 수정

- Storybook 테스트 CI 환경에서 필요한 패키지 설치 (concurrently, http-server, wait-on)
- 이미 설정된 `test-storybook:ci` 스크립트가 정상 작동하도록 의존성 추가
- `__test is not defined` 오류 해결을 위한 환경 구성 완료

## test 완료 여부
- [x] 로컬에서 `npm run test-storybook:ci` 명령으로 테스트 실행 확인
- [x] GitHub Actions에서 테스트 실행 확인

## 리뷰 요구사항
- 추가된 패키지가 적절한지 확인 부탁드립니다
- CI 환경에서 테스트가 안정적으로 실행되는지 확인 부탁드립니다

## 추가 정보

Storybook 공식 문서에서는 CI 환경에서 테스트를 안정적으로 실행하기 위해 다음과 같은 방식을 권장합니다:

```json
{
  "test-storybook:ci": "concurrently -k -s first -n \"SB,TEST\" -c \"magenta,blue\" \"npm run build-storybook --quiet && npx http-server storybook-static --port 6006 --silent\" \"wait-on tcp:6006 && npm run test-storybook\""
}
```

또한, 공식 문서에서는 다음과 같이 설명하고 있습니다:

> "Building Storybook locally makes it simple to test Storybooks that could be available remotely, but are under authentication layers. If you also deploy your Storybooks somewhere (e.g. Chromatic, Vercel, etc.), the Storybook URL can still be useful with the test-runner. You can pass it to the REFERENCE_URL environment variable when running the test-storybook command, and if a story fails, the test-runner will provide a helpful message with the link to the story in your published Storybook instead."

이는 로컬에서 Storybook을 빌드하면 원격에서 사용 가능하지만 인증 레이어 아래에 있을 수 있는 Storybook을 테스트하기 쉽게 만든다는 의미입니다. 또한, 스토리북을 어딘가에 배포하는 경우(예: Chromatic, Vercel 등), `REFERENCE_URL` 환경 변수를 사용하여 테스트 실패 시 해당 스토리에 대한 링크를 제공받을 수 있습니다.

이번 PR에서는 공식 문서에서 권장하는 방식대로 CI 환경에서 Storybook 테스트를 안정적으로 실행할 수 있도록 필요한 패키지를 설치했습니다.
