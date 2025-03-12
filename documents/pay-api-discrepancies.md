# Pay API 불일치 사항

## Endpoint Path 차이점

- PayPageAPI.ts: `/space/${spaceID}/pay/receive` - swagger.json에 존재하지 않는 엔드포인트
- PayPageAPI.ts: `/space/pay/recent-bank-info` - swagger.json에서는 `/space/{spaceId}/pay/bank`
- PayPageAPI.ts: `/space/${spaceID}/all-member` - swagger.json에 존재하지 않는 엔드포인트
- PayPageAPI.ts: `/space/${spaceID}/chat/chatroom` 및 `/space/${spaceId}/chat/${chatRoomId}/member` - 이 채팅 엔드포인트들은 swagger.json의 Pay 섹션에 존재하지 않음

## Request/Response Type 차이점

- `payCompleteApi` - swagger.json에서는 엔드포인트가 `/space/{spaceId}/pay/{payRequestTargetId}/complete`이고 PATCH 메소드를 사용하지만, PayPageAPI.ts에서는 `/space/3/pay/complete`를 사용하고 POST 메소드와 다른 요청 본문 구조를 사용함
- `payCreateApi` - swagger.json에서는 엔드포인트가 `/space/{spaceId}/pay/create`이지만 PayPageAPI.ts에서는 `/space/${spaceId}/pay`임. 또한 요청 본문 구조가 다름:
  - swagger.json: `targets` 배열에 `targetMemberId`와 `requestedAmount`
  - PayPageAPI.ts: `targetInfoList` 배열에 `targetUserId`와 `requestAmount`

- PayPageAPI.ts의 응답 타입이 swagger.json의 구조와 일치하지 않음:
  - `payRequestInfoDtoListInComplete` vs swagger의 `inCompletePayRequestList`
  - `payRequestInfoDtoListComplete` vs swagger의 `completePayRequestList`
  - `payReceiveInfoDtoListIncomplete` 및 `payReceiveInfoDtoListComplete`는 swagger에 직접적인 대응 항목이 없음

## 누락된 Endpoints

- swagger.json에는 `/space/{spaceId}/pay/requested`와 같은 엔드포인트가 있지만 PayPageAPI.ts에는 구현되어 있지 않음

## Type 구조 차이점

- PayPageAPI.ts의 `targetInfoList` 인터페이스는 `targetUserId`와 `requestAmount`를 사용하지만, swagger.json의 동등한 타입 `TargetOfPayRequest`는 `targetMemberId`와 `requestedAmount`를 사용함
- 홈, 요청 목록, 상세 보기에 대한 응답 구조가 두 파일 간에 일치하지 않음

## 주요 타입 불일치 요약

| PayPageAPI.ts | swagger.json | 문제 |
|---------------|--------------|-------|
| targetUserId | targetMemberId | 필드 이름 불일치 |
| requestAmount | requestedAmount | 필드 이름 불일치 |
| payRequestInfoDtoList | requestInfoInHome | 응답 구조 불일치 |
| payReceiveInfoDtoList | requestedPayInfoInHome | 응답 구조 불일치 |
| recentPayRequestBankInfoDtoList | bankInfos | 응답 구조 불일치 |

## 가능한 원인

이러한 불일치는 다음과 같은 원인을 시사함:

1. API가 발전하면서 swagger.json이 구현보다 더 최신 상태임
2. 구현이 swagger.json에 문서화되지 않은 사용자 정의 엔드포인트나 구조를 사용하고 있음
3. 프론트엔드 기대치와 백엔드 구현 사이에 불일치가 있을 수 있음
