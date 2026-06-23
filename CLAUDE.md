# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 개요

Codeit 풀스택 강의용 React Query 실습 프로젝트. 투두리스트 앱을 통해 `useEffect` 기반 데이터 페칭 → TanStack Query 전환 흐름을 학습한다.

## 명령어

```bash
# 개발 서버 (Next.js, localhost:3000)
npm run dev

# 목 API 서버 (json-server, localhost:4000)
npm run json

# 빌드 / 린트
npm run build
npm run lint
```

개발 시 두 서버를 **동시에** 실행해야 한다. Next.js 앱이 `http://localhost:4000/todos`를 직접 호출한다.

## 아키텍처

```
src/
├── app/
│   ├── page.jsx          # 홈 (투두 목록)
│   ├── [id]/page.jsx     # 투두 상세 (동적 라우트)
│   ├── layout.jsx        # 루트 레이아웃
│   └── _components/
│       ├── TodoList.jsx  # 목록 렌더링
│       ├── TodoItem.jsx  # 개별 아이템 + 상세보기 링크
│       └── TodoForm.jsx  # 할 일 추가 폼
└── lib/services/
    └── todos.js          # API 함수 모음 (fetch 래퍼)
db.json                   # json-server 데이터 파일
```

**데이터 흐름**: `src/lib/services/todos.js`에 `fetchTodos`, `fetchTodo`, `addTodo`, `deleteTodo`, `toggleTodoStatus` 함수가 정의되어 있고, 컴포넌트에서 import해서 사용한다.

## 브랜치 구조 (학습 단계)

- `1-useEffect` — `useEffect`로 데이터 페칭 구현 (현재 브랜치)
- 이후 브랜치에서 TanStack Query(`@tanstack/react-query`)로 전환 예정

## 현재 미완성 코드 (TODO)

`src/app/page.jsx`의 `loadTodos` 함수: `useEffect` + `fetchTodos` 호출 로직을 추가해야 한다. 주석 참고.

`src/app/_components/TodoForm.jsx`: `addTodo` import 누락, `setError` state 미선언 상태.

## 기술 스택

- Next.js 16 (App Router) + React 19, JavaScript (JSX, TypeScript 없음)
- Tailwind CSS v4
- json-server 0.17 (목 REST API)
- `@alias` → `src/` (jsconfig.json의 `paths` 설정)
