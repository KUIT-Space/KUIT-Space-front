## Summary
Pay API를 ky 클라이언트와 React Query를 이용하여 리팩토링했습니다. 이를 통해 캐싱 전략을 적용하고 데이터 페칭 로직을 표준화하였습니다.

## PR 유형 및 세부 작업 내용
- [x] 코드 리팩토링

#### 세부 내용
1. Pay 도메인 관련 TypeScript 인터페이스 정의
   - 스웨거 문서 기반 타입 정의
   - 백엔드 API 응답 타입 구현

2. ky 클라이언트를 이용하여 API 함수 구현
   - 기존 fetch 사용 코드를 ky로 마이그레이션
   - 에러 핸들링 및 응답 타입 적용

3. React Query 쿼리 키 생성
   - 도메인별 일관된 쿼리 키 구조 적용
   - 캐시 무효화를 위한 계층 구조 설계

4. useQuery와 useMutation 훅 구현
   - GET 요청을 위한 useQuery 커스텀 훅 구현
   - POST, PATCH, DELETE 요청을 위한 useMutation 커스텀 훅 구현
   - Naming Convention 적용 (useNounQuery, useVerbResource)

5. 캐싱 전략 적용
   - gcTime 30초 설정으로 적절한 데이터 캐싱 전략 구현
   - refetchInterval 설정을 통해 30초마나 refetching하여 약간의 실시간성 보장
   - 상태 변경 시 관련 쿼리 무효화 로직 추가

## 작동 스크린샷
API 코드 리팩토링이므로 UI 변경 없음

## 리뷰 요구사항
- 네이밍 컨벤션이 일관되게 적용되었는지 확인
- 캐싱 전략이 적절한지 검토
- 쿼리 무효화 로직이 필요한 곳에 모두 적용되었는지 확인
