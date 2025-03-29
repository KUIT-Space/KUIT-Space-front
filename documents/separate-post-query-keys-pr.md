## Summary

기존에 미완성되어있는 api가 백엔드에서 제공됨에 따라 게시판, 게시글, 좋아요 api를 연동하였습니다. 다만 댓글 같은 경우 백엔드에서 아직 commentId를 제공하지 못하고 있어 댓글 좋아요, 수정 및 삭제는 불가능합니다.

## PR 유형 및 세부 작업 내용
- [x] 새로운 기능 추가
- [x] 코드 리팩토링
  - 게시판과 게시글의 쿼리 키를 분리하여 관리하도록 변경
  - `boardKeys`에서 게시글 관련 키 제거
  - `postKeys` 구조 추가 및 관련 쿼리들 업데이트

- [x] 코드에 영향을 주지 않는 변경사항(오타 수정, 탭 사이즈 변경, 변수명 변경)
  - 쿼리 키 구조 변경으로 인한 코드 정리

## 쿼리 키 및 캐싱 디자인

![Query Key Structure](https://www.mermaidchart.com/raw/ee1bf4d0-dfe4-472b-bb7a-be0e1d4801c8?theme=light&version=v0.1&format=svg)

## 세부 변경사항
1. `postKeys` 쿼리 키 추가
2. `boardKeys` 구조 단순화
3. custom query hook에서 의존하는 쿼리 키 목록 업데이트
4. custom mutation hook에서 의존하는 쿼리 키 목록 업데이트

## 리뷰 요청 사항
- 쿼리키 캐싱이 올바르게 설계되었는지 확인 부탁드립니다.
