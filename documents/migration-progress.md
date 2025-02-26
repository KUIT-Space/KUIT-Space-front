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

## 남은 작업
1. Space 관련 API
   - `SpaceCreateApi.ts`
   - `SpaceJoinInfoApi.ts`
   - `SpaceSearchAllUserApi.ts`
   - `SpaceSearchUserProfile.ts`
   - `SpaceSelectApi.ts`
   - `SpaceUserJoinApi.ts`

2. Chat 관련 API
   - `ChatroomCreateApi.ts`
   - `ChatroomExitDelete.ts`
   - `ChatroomSearchAllApi.ts`
   - `ChatroomSearchAllUserApi.ts`
   - `ChatroomUpdateNameApi.ts`

3. Voice Room 관련 API
   - `voiceroomApi.ts`

## 다음 작업
- Space 관련 API 마이그레이션 시작
- 변환된 코드 테스트
- PR 생성 및 리뷰 요청
