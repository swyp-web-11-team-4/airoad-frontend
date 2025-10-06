# SWYP Web 11기 Team 4 Frontend

React + TypeScript + Vite 기반의 프론트엔드 프로젝트입니다.

## 기술 스택

- **React 19** - UI 라이브러리
- **TypeScript** - 타입 안정성
- **Vite** - 빌드 도구 (SWC 플러그인 사용)
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

```
.
├── src/
│   ├── main.tsx        # 앱 진입점
│   ├── App.tsx         # 루트 컴포넌트
│   └── ...
├── index.html          # HTML 진입점
├── vite.config.ts      # Vite 설정
├── biome.json          # Biome 설정
└── tsconfig.json       # TypeScript 설정
```

## 코드 스타일

이 프로젝트는 **Biome**를 사용하여 코드 스타일을 관리합니다.

- 줄 길이: 100자
- 들여쓰기: 2칸
- import 자동 정렬
- TypeScript strict 모드 활성화

코드 작성 후에는 `pnpm format:fix`와 `pnpm lint:fix`를 실행하여 스타일을 맞춰주세요.

## 주요 설정

### Vite + SWC

- `@vitejs/plugin-react-swc`를 사용하여 빠른 빌드와 HMR 지원
- React Compiler는 SWC와 호환되지 않아 사용하지 않음

### TypeScript

- Strict 모드 활성화
- 사용하지 않는 변수/매개변수 검사
- 프로젝트 레퍼런스 분리 (앱 코드 / 빌드 도구)

## 라이선스

MIT
