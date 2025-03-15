## Summary

이벤트 관련 훅(useEventQuery, useEventsQuery)에 폴링 기능을 추가하여 사용자가 수동으로 새로고침하지 않아도 이벤트 정보와 참가자 목록이 자동으로 업데이트되도록 개선했습니다. 또한 타입 안전성을 높이기 위해 옵션 파라미터의 타입을 개선했습니다.

## PR 유형 및 세부 작업 내용

- [x] 새로운 기능 추가
- [x] 코드 리팩토링
- [x] 코드에 영향을 주지 않는 변경사항(오타 수정, 탭 사이즈 변경, 변수명 변경)

### 세부 내용
1. **폴링 기능 추가**
   - QRDetail.tsx의 useEventQuery에 10000ms(10초) 폴링 간격 적용
   - QRPage.tsx의 useEventQuery에 10000ms(10초) 폴링 간격 적용
   - QRHome.tsx의 useEventsQuery에 10000ms(10초) 폴링 간격 적용

2. **타입 안전성 개선**
   - useEventQuery와 useEventsQuery 훅의 옵션 파라미터 타입을 Partial<UseSuspenseQueryOptions>로 개선
   - 구체적인 제네릭 타입 파라미터를 지정하여 타입 추론 강화

3. **기타 개선사항**
   - QRDetail.tsx의 Member 컴포넌트에 key prop 추가하여 린터 오류 수정

## 테스트 완료 여부
- [x] QRDetail 페이지에서 참가자 목록이 10초마다 자동으로 업데이트되는지 확인
- [x] QRPage 페이지에서 이벤트 정보가 10초마다 자동으로 업데이트되는지 확인
- [x] QRHome 페이지에서 이벤트 목록이 10초마다 자동으로 업데이트되는지 확인

## 작동 스크린샷
(실제 작동 화면 스크린샷이 필요한 경우 추가 예정)
