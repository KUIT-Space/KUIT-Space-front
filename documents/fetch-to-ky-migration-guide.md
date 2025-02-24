# Fetch to Ky Migration Guide

## Overview

프로젝트의 HTTP 클라이언트를 fetch API에서 ky로 마이그레이션하기 위한 가이드입니다.

## 기본 설정

src/apis/client.ts에서 ky 인스턴스를 아래와 같이 설정합니다.

- prefixUrl: VITE_API_BACK_URL 사용
- Authorization 토큰 자동 처리: 요청 전에 localStorage에 저장된 토큰을 헤더에 추가
- 401 에러 시 토큰 자동 삭제: 응답이 401인 경우 localStorage에서 토큰 제거
- retry 설정: 기본 재시도 횟수를 설정하여 네트워크 오류에 대비

```ts
import ky from "ky";
export interface ApiResponse<T = unknown> {
  code: number;
  message: string;
  status: string;
  timestamp?: string;
  result?: T;
}
export const client = ky.create({
  prefixUrl: import.meta.env.VITE_API_BACK_URL,
  hooks: {
    beforeRequest: [
      (request) => {
        const token = localStorage.getItem("Authorization");
        if (token) { request.headers.set("Authorization", token); }
      }
    ],
    afterResponse: [
      async (request, options, response) => {
        if (response.status === 401) { localStorage.removeItem("Authorization"); }
      }
    ]
  },
  retry: {
    limit: 2,
    methods: ["get", "put", "head", "delete", "options", "trace"]
  },
});
```

## 마이그레이션 예시

1. LoginApi.ts

기존 fetch API 코드

```ts
export async function login(credentials: {username: string; password: string}) {
  const response = await fetch(`${import.meta.env.VITE_API_BACK_URL}/login`, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(credentials)
  });
  if (!response.ok) throw new Error("Login failed");
  const data = await response.json();
  if (data.token) { localStorage.setItem("Authorization", data.token); }
  if (data.userId) { localStorage.setItem("userId", data.userId); }
  return data;
}
```

ky 마이그레이션 코드

```ts
import { client } from "./client";
export async function login(credentials: {username: string; password: string}) {
  const data = await client.post("login", {json: credentials}).json();
  if (data.token) { localStorage.setItem("Authorization", data.token); }
  if (data.userId) { localStorage.setItem("userId", data.userId); }
  return data;
}
```

2. SpaceCreateApi.ts

기존 fetch API 코드 (FormData 요청, 파일 업로드, 인증 토큰 사용)

```ts
export async function createSpace(formData: FormData) {
  const response = await fetch(`${import.meta.env.VITE_API_BACK_URL}/spaces/create`, {
    method: "POST",
    headers: {"Authorization": localStorage.getItem("Authorization") || ""},
    body: formData
  });
  if (!response.ok) throw new Error("Space creation failed");
  return await response.json();
}
```

ky 마이그레이션 코드

```ts
import { client } from "./client";
export async function createSpace(formData: FormData) {
  return client.post("spaces/create", {body: formData}).json();
}
```

3. 응답 타입 처리

ApiResponse 인터페이스와 타입 파라미터 활용 예시

```ts
import { client, ApiResponse } from "./client";
export async function getUserProfile(userId: string) {
  return client.get(`users/${userId}`).json<ApiResponse<{id: string; name: string}>>();
}
```

4. 에러 처리

기존 fetch API 코드 (HTTPError, 401 에러, 기타 에러 로깅)

```ts
export async function fetchData(endpoint: string) {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_BACK_URL}/${endpoint}`, {
      headers: {"Authorization": localStorage.getItem("Authorization") || ""}
    });
    if (!response.ok) {
      if (response.status === 401) { localStorage.removeItem("Authorization"); }
      throw new Error("HTTP error: " + response.status);
    }
    return await response.json();
  } catch (error) {
    console.error("Fetch API error:", error);
    throw error;
  }
}
```

ky 마이그레이션 코드

```ts
import { client } from "./client";
export async function fetchData(endpoint: string) {
  try {
    return await client.get(endpoint).json();
  } catch (error: any) {
    if (error.response && error.response.status === 401) {
      console.error("Unauthorized error, token removed");
    }
    console.error("Ky API error:", error);
    throw error;
  }
}
```

## 마이그레이션 순서

1. Login 관련 API

```ts
export async function login(credentials: {username: string; password: string}) {
  const data = await client.post("login", {json: credentials}).json();
  if (data.token) { localStorage.setItem("Authorization", data.token); }
  if (data.userId) { localStorage.setItem("userId", data.userId); }
  return data;
}
```

- SpaceJoinInfoApi.ts
- SpaceSearchAllUserApi.ts
- SpaceSearchUserProfile.ts
- SpaceSelectApi.ts
- SpaceUserJoinApi.ts
- Chat 관련 API
- ChatroomCreateApi.ts
- ChatroomExitDelete.ts
- ChatroomSearchAllApi.ts
- ChatroomSearchAllUserApi.ts
- ChatroomUpdateNameApi.ts
- Voice Room 관련 API
- voiceroomApi.ts

참고사항
	•	ky GitHub 링크: https://github.com/sindresorhus/ky
	•	client.ts 설정 참고: 위의 ky 인스턴스 설정을 참고하세요.
	•	_createRequestOptions.ts 제거 계획: 기존 _createRequestOptions.ts 파일은 더 이상 필요하지 않으므로 제거 예정입니다.
