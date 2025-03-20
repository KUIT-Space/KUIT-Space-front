# Pay API 캐싱 전략 가이드

## 개요

이 문서는 정산 API(Pay API)의 React Query 캐싱 전략에 대한 결정사항을 정리한 것입니다. 금전 관련 데이터를 다루는 특성상 실시간성과 사용자 경험(UX) 사이의 균형을 고려하여 최적의 전략을 수립했습니다.

## Pay API 특성

- 최대 40명 정도의 사용자가 상호작용하는 정산 시스템
- 초 단위로 금액이 바뀌진 않지만, 금전 관련 정보이므로 적절한 실시간성 필요
- 사용자 액션(정산 요청, 완료 등)에 따라 데이터 변경 발생

## 캐싱 전략 결정사항

### 1. React Query 설정

```typescript
// 권장 설정
{
  staleTime: 10 * 1000, // 10초
  cacheTime: 60 * 1000, // 1분
  refetchOnWindowFocus: true,
  refetchOnReconnect: true
}
```

**staleTime (0초)**
- 데이터가 빠르게 stale 상태가 되도록 짧게 설정
- 이를 통해 컴포넌트가 마운트되거나 윈도우 포커스 시 background refetch 발생

**cacheTime (30초~1분)**
- 완전히 0으로 설정하지 않고 적절한 값 유지
- 사용자가 페이지를 이동했다가 돌아왔을 때 로딩 화면을 최소화하여 UX 개선
- 서버 부하 및 네트워크 트래픽 감소

### 2. Mutation 후 데이터 무효화

현재 구현된 대로 mutation 성공 후 관련 쿼리를 무효화하는 전략을 유지합니다:

```typescript
// 예: useCreatePay mutation
export const useCreatePay = (spaceId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: RequestOfCreatePay) => createPay(spaceId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: payKeys.home(spaceId) });
      queryClient.invalidateQueries({ queryKey: payKeys.request(spaceId) });
    },
  });
};
```

### 3. 주요 화면의 자동 갱신 설정

정산 현황을 보여주는 주요 화면에서는 refetchInterval을 활용한 주기적 갱신 고려:

```typescript
// 주요 화면에서의 사용 예시
const { data } = usePayHomeQuery(spaceId, {
  refetchInterval: 30 * 1000, // 30초마다 갱신
});
```

### 4. UI/UX 개선 방안

데이터의 신선도와 관련하여 사용자에게 투명성을 제공하기 위한 UI/UX 개선 방안:

- 마지막 데이터 업데이트 시간 표시
- 수동 새로고침 버튼 제공
- 데이터 로딩/fetching 상태를 명확히 표시

## 결론

cacheTime을 0으로 설정하는 극단적인 방법보다는, React Query의 다양한 기능(staleTime, refetchOnFocus, mutation 후 invalidation 등)을 활용하여 실시간성과 사용자 경험 사이의 균형을 맞추는 것이 효과적입니다. 이를 통해 데이터의 정확성은 유지하면서도 사용자에게 매끄러운 경험을 제공할 수 있습니다.
