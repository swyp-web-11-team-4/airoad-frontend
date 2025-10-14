# SWYP Web 11기 Team 4 Frontend

React + TypeScript + Vite 기반의 프론트엔드 프로젝트입니다.

## 기술 스택

- **React 19** - UI 라이브러리
- **TypeScript** - 타입 안정성
- **Vite** - 빌드 도구 (SWC 플러그인 사용)
- **React Query** - 서버 상태 관리
- **React Router** - 라우팅
- **Vanilla Extract** - CSS-in-JS 스타일링
- **MSW** - API 모킹
- **Biome** - 린팅 및 포매팅
- **pnpm** - 패키지 매니저

## 시작하기

### 사전 요구사항

- Node.js 18 이상
- pnpm 8 이상

### 설치

```bash
pnpm install
```

### 개발 서버 실행

```bash
pnpm dev
```

개발 서버가 시작되면 브라우저에서 로컬 주소로 접속할 수 있습니다.

## 사용 가능한 명령어

### 개발

- `pnpm dev` - 개발 서버 시작 (HMR 지원)
- `pnpm build` - 프로덕션 빌드 (타입 체크 포함)
- `pnpm preview` - 프로덕션 빌드 미리보기

### 코드 품질

- `pnpm lint` - Biome 린터로 코드 검사
- `pnpm lint:fix` - 린팅 문제 자동 수정
- `pnpm format` - 코드 포맷 검사
- `pnpm format:fix` - 코드 자동 포맷팅

## 프로젝트 구조

이 프로젝트는 **Feature-Sliced Design** 아키텍처를 따릅니다.

```
src/
├── app/                  # 앱 레벨 설정
│   ├── providers/        # React Query, Router 등 프로바이더
│   ├── mocks/            # MSW 설정 및 핸들러 통합
│   ├── types/            # 환경
│   └── styles/           # 전역 스타일
│
├── entities/             # 비즈니스 엔티티 (model)
│   └── [entity]/         # 예: user, post
│       ├── api/          # 백엔드 간의 요청 및 쿼리, mock 핸들러
│       ├── config/       # 도메인 설정, 상수 (dev용 기본값 포함)
│       ├── model/        # 타입 정의
│       └── index.ts
│
├── pages/                # 페이지 컴포넌트, 데이터를 받아 UI에 표시
│   └── [page-name]/      # entities에서 내려주는 데이터를 받음 
│       ├── ui/           # 페이지 UI 컴포넌트
│       ├── model/        # hook 정의 (mutation, useSuspenseQuery)
│       └── index.ts
│
└── shared/               # 공유 리소스
    ├── api/              # API 클라이언트 설정
    ├── lib/              # 유틸리티 (axios, msw)
    ├── ui/               # 재사용 가능한 UI 컴포넌트
    ├── type/             # 전역에서 공유되는 타입
    └── config/           # 환경 설정
```

### 주요 원칙

- **폴더 네이밍**: 모든 폴더는 `hyphen-case` 사용 (예: `create-user`, `user-list`)
- **API 요청 및 React Query와 핸들러**: `entities/[entity]/api/`에 구현
- **UI 컴포넌트**: Vanilla Extract 사용, 인라인 스타일 금지
- **모든 프로바이더**: `app/providers/`에서 관리
- **MSW 통합**: 모든 핸들러는 `app/mocks/browser.ts`에 등록

더 자세한 아키텍처 가이드는 [CLAUDE.md](./CLAUDE.md)를 참조하세요.

## 코드 스타일

이 프로젝트는 **Biome**를 사용하여 코드 스타일을 관리합니다.

- 줄 길이: 100자
- 들여쓰기: 2칸
- import 자동 정렬
- TypeScript strict 모드 활성화

코드 작성 후에는 `pnpm format:fix`와 `pnpm lint:fix`를 실행하여 스타일을 맞춰주세요.

### Git Hooks

이 프로젝트는 **Husky**와 **lint-staged**를 사용하여 커밋 전 자동으로 코드 검사를 수행합니다.

- **pre-commit**: staged 파일에 대해 `biome check --write` 실행
- **commit-msg**: Conventional Commits 형식 검증

## 스타일링 가이드

모든 UI 컴포넌트는 **Vanilla Extract**를 사용합니다.

```typescript
// ❌ 잘못된 예 - 인라인 스타일 사용
<div style={{ padding: "20px" }}>Content</div>

// ✅ 올바른 예 - Vanilla Extract 사용
// Component.css.ts
export const container = style({ padding: "20px" });

// Component.tsx
<div className={styles.container}>Content</div>
```

## 주요 설정

### Vite + SWC

- `@vitejs/plugin-react-swc`를 사용하여 빠른 빌드와 HMR 지원
- Vanilla Extract Vite 플러그인 통합
- React Compiler는 SWC와 호환되지 않아 사용하지 않음

### TypeScript

- Strict 모드 활성화
- 사용하지 않는 변수/매개변수 검사
- 프로젝트 레퍼런스 분리 (앱 코드 / 빌드 도구)

### MSW (Mock Service Worker)

- 개발 환경에서 API 모킹 지원
- `public/mockServiceWorker.js`에 워커 파일 위치
- `import.meta.env.DEV`일 때만 모킹 활성화

## 라이선스

MIT
