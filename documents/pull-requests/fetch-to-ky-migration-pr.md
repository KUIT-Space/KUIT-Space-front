# Fetch API에서 Ky 라이브러리로 API 클라이언트 마이그레이션

## Summary
기존 Fetch API를 사용하던 모든 API 호출 코드를 Ky 라이브러리를 사용하도록 마이그레이션했습니다. 이를 통해 코드의 일관성을 높이고, 에러 처리와 인증 토큰 관리를 중앙화하여 코드 품질과 유지보수성을 향상시켰습니다.

연관된 이슈: #15

## PR 유형 및 세부 작업 내용
- [x] 코드 리팩토링
- [x] 주석 추가 및 수정
- [x] 문서 수정

### 세부 내용

#### 1. 기본 설정
- Ky 패키지 설치
- `src/apis/client.ts` 생성 및 설정
  - 기본 URL 설정
  - 인증 토큰 자동 추가 로직
  - 401 응답 시 토큰 제거 로직
  - 재시도 로직 설정
- 마이그레이션 가이드 문서 작성

#### 2. API 마이그레이션
1. **Login 관련 API**
   - `LoginApi.ts` 변환
     - `loginApi` 함수 마이그레이션
     - `kakaoLoginApi` 함수 마이그레이션
     - `fetchLoginApi` 헬퍼 함수 유지 및 수정
   - `GetUserProfileApi.ts` 변환

2. **Space 관련 API**
   - `SpaceCreateApi.ts` 변환
   - `SpaceJoinInfoApi.ts` 변환
   - `SpaceSearchAllUserApi.ts` 변환
   - `SpaceSearchUserProfile.ts` 변환
   - `SpaceSelectApi.ts` 변환
   - `SpaceUserJoinApi.ts` 변환

3. **Chat 관련 API**
   - `ChatroomSearchAllApi.ts` 변환
   - `ChatroomSearchAllUserApi.ts` 변환
   - `ChatroomUpdateNameApi.ts` 변환
   - `ChatroomCreateApi.ts` 변환
   - `ChatroomExitDelete.ts` 변환

4. **Voice Room 관련 API**
   - `voiceroomApi.ts` 변환
     - `VrParticipantApi` 함수 마이그레이션
     - `VrListApi` 함수 마이그레이션
     - `VrTokenApi` 함수 마이그레이션
     - `VrCreateApi` 함수 마이그레이션
     - `VrEditApi` 함수 마이그레이션

#### 3. JSDoc 개선
- 모든 API 함수에 JSDoc 추가 및 개선
- 반환 타입을 `Promise<~ApiResponse | null>`로 명시
- 인터페이스에 대한 JSDoc 추가
- 파라미터 설명 추가

#### 4. 추가 문서 작성
- `documents/fetch-to-ky-migration-guide.md`: 마이그레이션 가이드 문서
- `documents/migration-progress.md`: 마이그레이션 진행 상황 문서
- `documents/voiceroom-api-consistency-plan.md`: Voice Room API 일관성 개선 계획 문서

## 주요 개선 사항

### 1. 코드 일관성 향상
- 모든 API 호출이 동일한 패턴을 따르도록 통일
- 에러 처리 방식 표준화
- 응답 처리 방식 표준화

### 2. 중앙화된 설정
- 기본 URL 설정을 한 곳에서 관리
- 인증 토큰 관리 로직 중앙화
- 에러 처리 로직 중앙화

### 3. 타입 안전성 향상
- 모든 API 응답에 대한 인터페이스 정의
- 명확한 반환 타입 지정
- JSDoc을 통한 문서화 강화

### 4. 유지보수성 향상
- 코드 중복 제거
- 명확한 에러 로깅
- 일관된 코드 스타일

## 향후 작업
- Voice Room API의 일관성 개선 (별도 PR 예정)
  - `VrCreateApi`와 `VrEditApi`가 현재 Response 객체를 반환하고 있어 다른 API 함수들과 일관성이 없음
  - 자세한 내용은 `documents/voiceroom-api-consistency-plan.md` 참조

## 테스트 완료 여부
- 모든 API 호출에 대한 기본 동작 테스트 필요
