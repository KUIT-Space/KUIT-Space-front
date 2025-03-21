# React Query Hooks 사용 가이드

안녕하세요 팀원 여러분! 이 가이드는 프로젝트에서 구현된 React Query hooks의 사용법을 설명합니다. React Query를 활용하면 서버 상태 관리를 효율적으로 할 수 있으며, 로딩 상태, 에러 처리, 캐싱 등을 쉽게 구현할 수 있습니다.

## 목차
1. [Query Hooks 사용법](#query-hooks-사용법)
2. [Mutation Hooks 사용법](#mutation-hooks-사용법)
3. [로딩 및 에러 상태 처리](#로딩-및-에러-상태-처리)
4. [실제 사용 예시](#실제-사용-예시)

## Query Hooks 사용법

Query hooks는 데이터를 조회할 때 사용합니다. 프로젝트에서는 `useSuspenseQuery`를 사용하여 구현되어 있습니다.

### 기본 사용법

```tsx
import { useEventsQuery, useEventQuery } from 'src/apis/event';

// 이벤트 목록 조회
function EventList({ spaceId }) {
  const { result: eventsList } = useEventsQuery(spaceId);

  return (
    <div>
      {eventsList.events.map(event => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
}

// 특정 이벤트 상세 조회
function EventDetail({ spaceId, eventId }) {
  const { result: eventDetails } = useEventQuery(spaceId, eventId);

  return (
    <div>
      <h1>{eventDetails.name}</h1>
      <p>날짜: {eventDetails.date}</p>
      <p>시간: {eventDetails.startTime} - {eventDetails.endTime}</p>
      {/* ... */}
    </div>
  );
}
```

### Suspense와 함께 사용하기

우리 프로젝트에서는 `useSuspenseQuery`를 사용하므로, 컴포넌트를 React의 Suspense로 감싸야 합니다:

```tsx
import { Suspense } from 'react';

function EventPage({ spaceId }) {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <EventList spaceId={spaceId} />
    </Suspense>
  );
}
```

## Mutation Hooks 사용법

Mutation hooks는 데이터를 생성, 수정, 삭제할 때 사용합니다. 최근에 구현된 이벤트 관련 mutation hooks를 통해 살펴보겠습니다.

### 기본 사용법

```tsx
import {
  useCreateEvent,
  useDeleteEvent,
  useJoinEvent,
  useAddEventParticipants,
  useRemoveEventParticipants
} from 'src/apis/event';

function EventManagement({ spaceId, eventId }) {
  // 이벤트 생성 mutation
  const { mutate: createEvent } = useCreateEvent(spaceId);

  // 이벤트 삭제 mutation
  const { mutate: deleteEvent } = useDeleteEvent(spaceId);

  // 이벤트 참여 mutation
  const { mutate: joinEvent } = useJoinEvent(spaceId, eventId);

  // 이벤트 참가자 추가 mutation
  const { mutate: addParticipants } = useAddEventParticipants(spaceId, eventId);

  // 이벤트 참가자 제거 mutation
  const { mutate: removeParticipants } = useRemoveEventParticipants(spaceId, eventId);

  // 사용 예시
  const handleCreateEvent = () => {
    const newEvent = {
      name: '팀 회식',
      image: 'https://example.com/image.jpg',
      date: '2025-03-15',
      startTime: '18:00',
      endTime: '21:00'
    };

    createEvent(newEvent);
  };

  const handleDeleteEvent = () => {
    deleteEvent(eventId);
  };

  // ...
}
```

### 로딩 상태 활용하기

Mutation hooks는 로딩 상태를 제공합니다. 이를 활용하여 사용자 경험을 개선할 수 있습니다:

```tsx
function CreateEventButton({ spaceId }) {
  const { mutate: createEvent, isPending } = useCreateEvent(spaceId);

  return (
    <button
      onClick={() => createEvent(newEventData)}
      disabled={isPending}
    >
      {isPending ? '생성 중...' : '이벤트 생성'}
    </button>
  );
}
```

### 성공/실패 처리하기

Mutation의 결과에 따라 추가 작업을 수행할 수 있습니다:

```tsx
function DeleteEventButton({ spaceId, eventId, onSuccess }) {
  const { mutate: deleteEvent } = useDeleteEvent(spaceId);

  const handleDelete = () => {
    deleteEvent(eventId, {
      onSuccess: () => {
        // 성공 시 실행할 코드
        toast.success('이벤트가 삭제되었습니다.');
        onSuccess?.();
      },
      onError: (error) => {
        // 실패 시 실행할 코드
        toast.error('이벤트 삭제에 실패했습니다.');
        console.error(error);
      }
    });
  };

  return <button onClick={handleDelete}>이벤트 삭제</button>;
}
```

## 로딩 및 에러 상태 처리

### Query Hooks

Query hooks는 Suspense와 함께 사용하므로, 로딩 상태는 Suspense의 fallback으로 처리합니다. 에러는 ErrorBoundary를 사용하여 처리할 수 있습니다:

```tsx
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

function EventPage() {
  return (
    <ErrorBoundary fallback={<ErrorMessage />}>
      <Suspense fallback={<LoadingSpinner />}>
        <EventList />
      </Suspense>
    </ErrorBoundary>
  );
}
```

### Mutation Hooks

Mutation hooks는 다음과 같은 상태를 제공합니다:

- `isPending`: 요청 진행 중
- `isError`: 요청 실패
- `isSuccess`: 요청 성공
- `error`: 에러 객체

```tsx
function JoinEventButton({ spaceId, eventId }) {
  const {
    mutate: joinEvent,
    isPending,
    isError,
    error
  } = useJoinEvent(spaceId, eventId);

  if (isError) {
    return (
      <div>
        <p>참여 실패: {error.message}</p>
        <button onClick={() => joinEvent()}>다시 시도</button>
      </div>
    );
  }

  return (
    <button onClick={() => joinEvent()} disabled={isPending}>
      {isPending ? '참여 중...' : '이벤트 참여하기'}
    </button>
  );
}
```

## 실제 사용 예시

### 이벤트 관리 페이지 구현

```tsx
import { useEventsQuery } from 'src/apis/event';
import { Suspense } from 'react';

function EventManagementPage({ spaceId }) {
  return (
    <div>
      <h1>이벤트 관리</h1>
      <CreateEventForm spaceId={spaceId} />
      <Suspense fallback={<p>이벤트 목록 로딩 중...</p>}>
        <EventListWithActions spaceId={spaceId} />
      </Suspense>
    </div>
  );
}

function EventListWithActions({ spaceId }) {
  const { result: eventsList } = useEventsQuery(spaceId);
  const { mutate: deleteEvent } = useDeleteEvent(spaceId);

  return (
    <ul>
      {eventsList.events.map(event => (
        <li key={event.id}>
          <span>{event.name} ({event.date})</span>
          <button onClick={() => deleteEvent(event.id)}>삭제</button>
          <Link to={`/events/${event.id}`}>상세보기</Link>
        </li>
      ))}
    </ul>
  );
}

function CreateEventForm({ spaceId }) {
  const [eventData, setEventData] = useState({
    name: '',
    date: '',
    startTime: '',
    endTime: '',
    image: ''
  });
  const { mutate: createEvent, isPending } = useCreateEvent(spaceId);

  const handleSubmit = (e) => {
    e.preventDefault();
    createEvent(eventData, {
      onSuccess: () => {
        setEventData({ name: '', date: '', startTime: '', endTime: '', image: '' });
        toast.success('이벤트가 생성되었습니다.');
      }
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* 폼 필드들 */}
      <button type="submit" disabled={isPending}>
        {isPending ? '생성 중...' : '이벤트 생성'}
      </button>
    </form>
  );
}
```

### 이벤트 상세 페이지 구현

```tsx
function EventDetailPage({ spaceId, eventId }) {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <EventDetail spaceId={spaceId} eventId={eventId} />
    </Suspense>
  );
}

function EventDetail({ spaceId, eventId }) {
  const { result: eventDetails } = useEventQuery(spaceId, eventId);
  const { mutate: joinEvent, isPending: isJoining } = useJoinEvent(spaceId, eventId);
  const { mutate: addParticipants } = useAddEventParticipants(spaceId, eventId);

  return (
    <div>
      <h1>{eventDetails.name}</h1>
      <p>날짜: {eventDetails.date}</p>
      <p>시간: {eventDetails.startTime} - {eventDetails.endTime}</p>

      <h2>참가자 ({eventDetails.participants.length}명)</h2>
      <ul>
        {eventDetails.participants.map(participant => (
          <li key={participant.id}>
            <img src={participant.profileImageUrl} alt={participant.name} />
            <span>{participant.name}</span>
          </li>
        ))}
      </ul>

      <button onClick={() => joinEvent()} disabled={isJoining}>
        {isJoining ? '참여 중...' : '이벤트 참여하기'}
      </button>

      <h3>참가자 추가</h3>
      <MemberSelector
        onSelect={(memberIds) => addParticipants(memberIds)}
      />
    </div>
  );
}
```

## 마무리

React Query hooks를 사용하면 서버 상태 관리를 효율적으로 할 수 있습니다. 특히 다음과 같은 이점이 있습니다:

1. **자동 캐싱**: 동일한 데이터에 대한 중복 요청 방지
2. **자동 리프레시**: 데이터 변경 시 자동으로 관련 쿼리 갱신
3. **로딩/에러 상태 관리**: 데이터 요청의 다양한 상태를 쉽게 처리
4. **낙관적 업데이트**: 서버 응답 전에 UI를 먼저 업데이트하여 사용자 경험 향상

이 가이드가 React Query hooks를 사용하는 데 도움이 되길 바랍니다. 추가 질문이 있으면 언제든지 물어보세요!
