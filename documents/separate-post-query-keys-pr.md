## Summary
게시판과 게시글의 쿼리 키를 분리하여 관리하도록 변경했습니다. 이는 코드의 명확성과 유지보수성을 향상시키기 위한 리팩토링입니다.

## PR 유형 및 세부 작업 내용
- [x] 코드 리팩토링
  - 게시판과 게시글의 쿼리 키를 분리하여 관리하도록 변경
  - `boardKeys`에서 게시글 관련 키 제거
  - `postKeys` 구조 추가 및 관련 쿼리들 업데이트

- [x] 코드에 영향을 주지 않는 변경사항(오타 수정, 탭 사이즈 변경, 변수명 변경)
  - 쿼리 키 구조 변경으로 인한 코드 정리

## 쿼리 키 및 캐싱 디자인

![Query Key Structure](https://www.mermaidchart.com/raw/ee1bf4d0-dfe4-472b-bb7a-be0e1d4801c8?theme=light&version=v0.1&format=svg)

## 세부 변경사항
1. `postKeys` 구조 추가
   ```typescript
   export const postKeys = {
     all: (spaceId: number, boardId: number) => ["posts", spaceId, boardId] as const,
     lists: (spaceId: number, boardId: number) => [...postKeys.all(spaceId, boardId), "list"] as const,
     list: (spaceId: number, boardId: number, filters: string) => [...postKeys.lists(spaceId, boardId), { filters }] as const,
     details: (spaceId: number, boardId: number) => [...postKeys.all(spaceId, boardId), "detail"] as const,
     detail: (spaceId: number, boardId: number, postId: number) => [...postKeys.details(spaceId, boardId), postId] as const,
   };
   ```

2. `boardKeys` 구조 단순화
   ```typescript
   export const boardKeys = {
     all: (spaceId: number) => ["boards", spaceId] as const,
     lists: (spaceId: number) => [...boardKeys.all(spaceId), "list"] as const,
     list: (spaceId: number, filters: string) => [...boardKeys.lists(spaceId), { filters }] as const,
   };
   ```

3. 쿼리 키 사용 업데이트
   - 게시글 목록 조회: `postKeys.lists`
   - 게시글 상세 조회: `postKeys.detail`
   - 댓글 관련 쿼리: `postKeys.lists` 및 `postKeys.detail`
   - 좋아요 관련 쿼리: `postKeys.lists` 및 `postKeys.detail`

4. Invalidate 로직 업데이트
   - 게시글 생성: 게시글 목록만 invalidate
   - 게시글 수정: 게시글 목록과 상세 모두 invalidate
   - 게시글 삭제: 게시글 목록만 invalidate
   - 댓글 생성/삭제: 게시글 목록과 상세 모두 invalidate
   - 댓글 수정: 게시글 상세만 invalidate
   - 좋아요 토글: 게시글 목록과 상세 모두 invalidate

