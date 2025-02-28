# Fetch to Ky Migration Progress

## 완료된 작업
1. 기본 설정
   - ky 패키지 설치
   - `src/apis/client.ts` 생성 및 설정
   - 마이그레이션 가이드 문서 작성

2. Login 관련 API 마이그레이션 (완료)
   - `LoginApi.ts` 변환 완료
     - `loginApi` 함수 마이그레이션
     - `kakaoLoginApi` 함수 마이그레이션
     - `fetchLoginApi` 헬퍼 함수 유지 및 수정
   - `GetUserProfileApi.ts` 변환 완료

3. Space 관련 API 마이그레이션 (완료)
   - `SpaceCreateApi.ts` 변환 완료
   - `SpaceJoinInfoApi.ts` 변환 완료
   - `SpaceSearchAllUserApi.ts` 변환 완료
   - `SpaceSearchUserProfile.ts` 변환 완료
   - `SpaceSelectApi.ts` 변환 완료
   - `SpaceUserJoinApi.ts` 변환 완료

4. Chat 관련 API 마이그레이션 (완료)
   - `ChatroomSearchAllApi.ts` 변환 완료
   - `ChatroomSearchAllUserApi.ts` 변환 완료
   - `ChatroomUpdateNameApi.ts` 변환 완료
   - `ChatroomCreateApi.ts` 변환 완료
   - `ChatroomExitDelete.ts` 변환 완료

## 남은 작업
1. Voice Room 관련 API
   - `voiceroomApi.ts`

2. JSDoc 개선 (모든 마이그레이션된 API 파일에 적용 필요)
   - Login 관련 API
   - Space 관련 API
   - Chat 관련 API
   - Voice Room 관련 API (마이그레이션 후)
   - 모든 API 함수의 JSDoc `@returns` 태그에서 반환 타입을 `Promise<~ApiResponse>`로 명시
   - 예: `@returns {Promise<LoginApiResponse | null>} 로그인 결과 또는 에러 발생 시 null`

## 다음 작업
- Voice Room 관련 API 마이그레이션
- JSDoc 반환 타입 일괄 수정
- 변환된 코드 테스트
- PR 생성 및 리뷰 요청

## 참고사항
- API 함수의 JSDoc에서 반환 타입은 `Promise<~ApiResponse | null>`와 같이 Promise로 감싸서 명시해야 함
- 이는 async 함수가 항상 Promise를 반환하기 때문에 타입 정확성을 높이고 문서화를 더 명확하게 하기 위함
- 예시: `@returns {Promise<ChatroomMemberApiResponse | null>} 채팅방 사용자 목록 정보 또는 에러 발생 시 null`
