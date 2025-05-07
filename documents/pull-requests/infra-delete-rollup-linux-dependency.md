## Summary
package.json에서 @rollup/rollup-linux-x64-gnu의 optional dependency를 제거하고, .gitignore에 .cursor를 추가하여 개발 환경의 일관성을 높였습니다. 해당 변경 사항은 feature/231-게시물-생성-및-view-개선 브랜치를 기반으로 합니다.


## PR 유형 및 세부 작업 내용
- [x] 빌드 부분 혹은 패키지 매니저 수정
- [x] 파일 혹은 폴더명 수정 (.gitignore)

- package.json의 optionalDependencies에서 `@rollup/rollup-linux-x64-gnu`를 제거하였습니다.
- .gitignore에 `.cursor`와 `# cursor`를 추가하여 Cursor IDE 관련 파일을 무시하도록 했습니다.
- packageManager 필드를 최신 yarn 정보로 갱신하였습니다.


## test 완료 여부 (선택)
변경 사항이 정상적으로 반영되는지 로컬에서 테스트 완료

## 작동 스크린샷 (선택)

## 리뷰 요구사항 (선택)
특이사항 없음
