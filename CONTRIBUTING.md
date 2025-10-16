# Contributing Guide

SWYP Web 11기 Team 4 Frontend 프로젝트에 기여하는 방법을 안내합니다.

## 컨벤션

### 네이밍 컨벤션

- **폴더**: `hyphen-case` (예: `create-user`, `user-list`)
- **컴포넌트 파일**: `hyphen-case` (예: `user-list.tsx`)

### 코드 스타일

**Biome**를 사용하여 린팅과 포매팅을 관리합니다:

- TypeScript strict 모드 활성화
- `any` 타입 사용 지양
- React Hook 의존성 배열 완전성 체크

### 코드 작성 컨벤션

#### 변수명

- **camelCase**: 일반 변수, 함수명, 파라미터
  ```typescript
  const userName = "John";
  const fetchUsers = async () => { ... };
  function handleClick(event: MouseEvent) { ... }
  ```

- **PascalCase**: 컴포넌트, 타입, 인터페이스, 클래스
  ```typescript
  interface User { ... }
  type UserRole = "admin" | "user";
  const UserList = () => { ... };
  class QueryClient { ... }
  ```

- **UPPER_SNAKE_CASE**: 상수
  ```typescript
  const API_BASE_URL = "https://api.example.com";
  const MAX_RETRY_COUNT = 3;
  ```

#### 함수 작성

**함수 선언 방식**:
- 모든 함수: **Arrow Function** 사용
- React 컴포넌트: `export const ComponentName = () => { ... }`
- Custom Hook: `export const useHookName = () => { ... }`

**명명 규칙**:
- 컴포넌트: 명사형 PascalCase (예: `UserList`, `UserCard`)
- 일반 함수: 동사+명사 camelCase (예: `fetchUsers`, `createUser`)
- Hook 함수: `use` 접두사 + camelCase (예: `useUsers`, `useCreateUser`)
- 이벤트 핸들러: `handle` 접두사 + camelCase (예: `handleClick`, `handleSubmit`)

**예시**:
```typescript
// ✅ 일반 함수 - Arrow Function
const fetchUsers = async (): Promise<User[]> => {
  const { data } = await api.get<User[]>("/users");
  return data;
};

// ✅ 컴포넌트 - Arrow Function
export const UserList = () => {
  return <div>...</div>;
};

// ✅ Custom Hook - Arrow Function
export const useUsers = (filters?: Record<string, unknown>) => {
  return useSuspenseQuery(userQueries.list(filters));
};

// ✅ 이벤트 핸들러 - Arrow Function
const handleSubmit = (event: FormEvent) => {
  event.preventDefault();
  // ...
};
```

#### 타입 정의

**Interface vs Type**:
- 객체 형태의 타입: `interface` 사용
- Union, Intersection, Primitive: `type` 사용

```typescript
// ✅ Interface 사용
interface User {
  id: number;
  name: string;
  email: string;
}

interface QueryProviderProps {
  children: ReactNode;
}

// ✅ Type 사용
type UserRole = "admin" | "user" | "guest";
type CreateUserInput = Omit<User, "id">;
```

#### React Query 패턴

**Query 작성**:
```typescript
// Query 키 팩토리 패턴
export const userQueries = {
  all: () => ["users"],
  lists: () => [...userQueries.all(), "list"],
  list: (filters?: Record<string, unknown>) =>
    queryOptions({
      queryKey: [...userQueries.lists(), filters],
      queryFn: fetchUsers,
    }),
  details: () => [...userQueries.all(), "detail"],
  detail: (id: number) =>
    queryOptions({
      queryKey: [...userQueries.details(), id],
      queryFn: () => fetchUser(id),
    }),
};

// Hook도 Arrow Function
export const useUsers = (filters?: Record<string, unknown>) => {
  return useSuspenseQuery(userQueries.list(filters));
};
```

**Mutation 작성**:
```typescript
// 일반 함수는 Arrow Function
const createUser = async (userData: Omit<User, "id">): Promise<User> => {
  const { data } = await api.post<User>("/users", userData);
  return data;
};

// Hook도 Arrow Function
export const useCreateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userQueries.lists() });
    },
  });
};
```

#### 컴포넌트 작성

**구조**:
```typescript
// 1. Import (외부 라이브러리 → 내부 모듈 → 타입 → 스타일)
import { useState } from "react";
import { useUsers } from "../../api";
import type { User } from "../../model/types";
import * as styles from "./user-list.css";

// 2. 컴포넌트
export const UserList = () => {
  // 3. Hooks
  const { data: users } = useUsers();
  const [selected, setSelected] = useState<User | null>(null);

  // 4. 이벤트 핸들러
  const handleSelect = (user: User) => {
    setSelected(user);
  };

  // 5. JSX 반환
  return (
    <div className={styles.container}>
      {users.map((user) => (
        <div key={user.id} onClick={() => handleSelect(user)}>
          {user.name}
        </div>
      ))}
    </div>
  );
};
```

**Props 타입**:
```typescript
// ✅ Interface 사용
interface UserCardProps {
  user: User;
  onSelect?: (user: User) => void;
}

export const UserCard = ({ user, onSelect }: UserCardProps) => {
  return <div onClick={() => onSelect?.(user)}>{user.name}</div>;
};
```

#### Import 정렬

```typescript
// 1. React 및 외부 라이브러리
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

// 2. 절대 경로 import (@로 시작)
import { api } from "@/shared/lib/axios";
import type { User } from "@/entities/user";

// 3. 상대 경로 import
import { useUsers } from "../../api";
import * as styles from "./component.css";
```

### 커밋 컨벤션

커밋 메시지는 [Conventional Commits](https://www.conventionalcommits.org/) 형식을 따릅니다:

```
<type>: <description>
```

**Type 종류**:
- `feat`: 새로운 기능
- `fix`: 버그 수정
- `docs`: 문서 변경
- `style`: 코드 포맷팅 (기능 변경 없음)
- `refactor`: 리팩토링
- `perf`: 성능 개선
- `test`: 테스트 추가/수정
- `chore`: 빌드, 패키지 매니저 설정 등
- `ci`: CI 설정
- `build`: 빌드 시스템 변경

**예시**:
```bash
feat: 사용자 프로필 페이지 추가
fix: 로그인 버튼 클릭 오류 수정
docs: README 업데이트
refactor: 사용자 API 구조 개선
chore: React Query 버전 업데이트
```

## 프로젝트 구조

### Feature-Sliced Design

이 프로젝트는 Feature-Sliced Design 아키텍처를 따릅니다.

#### 레이어 구조

**Pages** (`pages/[page-name]/`):
- 페이지 컴포넌트
- `ui/` 하위에 구현, 컴포넌트 단위는 세부 폴더로, (예: ui/user-form) 페이지 단위는 ui/index.ts 단위로 구성
- `model/` 로직 구현에 사용되는 hook을 작성 (예: `user.hook.ts`)

**Entities** (`entities/[entity]/`):
- 서비스의 비즈니스 객체 단위를 관리하는 폴더로, dto 영역 안의 로직을 작성 (api, handler, queries)
- `api/`: React Query를 사용한 query hooks
  - 파일명: `[entity].queries.ts` (예: `user.queries.ts`)
- `config/`: 비즈니스 객체 단위의 상수 파일 (예: `user.fixtrues.ts`) 
- `model/`: 타입 정의 및 query factory (예: `user.model.ts`, `user.queries.ts`)

**Shared** (`shared/`):
- 서비스 전역 공유 유틸리티 및 UI 컴포넌트
- `lib/`: 유틸리티 함수 (예: `axios.ts`, `msw.ts`)
- `ui/`: 재사용 가능한 공통 UI 컴포넌트
- `config/`: 환경 설정 (예: `env.ts`)
- `api/`: API 클라이언트 설정
- `store/`: 전역 상태 저장소

**App** (`app/`):
- 애플리케이션 레벨 설정
- `providers/`: React Query, Router 등 프로바이더 (예: `query-provider.tsx`, `router.tsx`)
- `mocks/`: MSW 설정 및 핸들러 통합 (예: `browser.ts`, `init.ts`)
- `styles/`: 전역 스타일 (예: `global.css.ts`)

### UI 컴포넌트 작성

모든 UI 컴포넌트는 **Vanilla Extract**를 사용합니다.

#### 구조

```
component-name/
├── component-name.tsx
├── component-name.css.ts
└── index.ts
```

#### ❌ 잘못된 예

```tsx
// 인라인 스타일 사용 금지
<div style={{ padding: "20px" }}>Content</div>
```

#### ✅ 올바른 예

```typescript
// user-card/user-card.css.ts
import { style } from "@vanilla-extract/css";

export const container = style({
  padding: "20px",
});

// user-card/user-card.tsx
import * as styles from "./user-card.css";

export const UserCard = () => {
  return <div className={styles.container}>Content</div>;
};

// user-card/index.ts
export { UserCard } from "./user-card";
```

## API 작성 가이드

### Query API

```typescript
// entities/user/model/user.queries.ts
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { api } from "@/shared/lib/axios";
import type { User } from "@/shared/type";

// 일반 함수는 Arrow Function
const fetchUsers = async (): Promise<User[]> => {
  const { data } = await api.get<User[]>("/users");
  return data;
};

// Query 키 팩토리 패턴
export const userQueries = {
  all: () => ["users"],
  lists: () => [...userQueries.all(), "list"],
  list: (filters?: Record<string, unknown>) =>
    queryOptions({
      queryKey: [...userQueries.lists(), filters],
      queryFn: fetchUsers,
    }),
};

// Hook도 Arrow Function
export const useUsers = (filters?: Record<string, unknown>) => {
  return useSuspenseQuery(userQueries.list(filters));
};
```

### Mutation API

```typescript
// pages/user/model/user.hook.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { userQueries } from "@/entities/user";
import { api } from "@/shared/lib/axios";
import type { User } from "@/shared/type";

// 일반 함수는 Arrow Function
const createUser = async (userData: Omit<User, "id">): Promise<User> => {
  const { data } = await api.post<User>("/users", userData);
  return data;
};

// Hook도 Arrow Function
export const useCreateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userQueries.lists() });
    },
  });
};
```

## MSW 설정

### GET Mock 

```typescript
// entities/user/api/user.handlers.ts
import { HttpResponse } from "msw";
import { createHandlers } from "@/shared/lib/msw";
import { mockUsers } from "./user.fixtures";

export const userHandlers = [
  createHandlers.get(`/users`, () => mockUsers),

  createHandlers.get(`/users/:id`, ({ params }) => {
    const { id } = params;
    const user = mockUsers.find((u) => u.id === Number(id));

    if (!user) {
      return HttpResponse.json(
        { success: false, error: "User not found" },
        { status: 404 }
      );
    }

    return HttpResponse.json({ success: true, data: user });
  }),
];
```

### Mutation Mock 

```typescript
// entities/user/api/create-user.handlers.ts
import { HttpResponse } from "msw";
import type { User } from "@/shared/type";
import { mockUsers } from "@/entities/user/mocks";
import { createHandlers } from "@/shared/lib/msw";

export const createUserHandlers = [
  createHandlers.post(`/users`, async ({ request }) => {
    const newUser = (await request.json()) as Omit<User, "id">;
    const user: User = {
      id: mockUsers.length + 1,
      ...newUser,
    };

    mockUsers.push(user);

    return HttpResponse.json(
      { success: true, data: user },
      { status: 201 }
    );
  }),
];
```

### 핸들러 등록

```typescript
// app/mocks/browser.ts
import { setupWorker } from "msw/browser";
import { userHandlers, createUserHandlers } from "@/entities/user";

export const worker = setupWorker(...userHandlers, ...createUserHandlers);
```

## Pull Request

### 기본 원칙

- 모든 기능 개발 및 버그 수정은 PR을 생성하여 반영됩니다.
- 단, 핫픽스와 같은 긴급 수정 사항은 경우에 따라 바로 `main` 브랜치에 병합할 수 있습니다.

## 질문

궁금한 점이 있다면 팀 멤버에게 문의하거나 Issue를 생성하세요.
