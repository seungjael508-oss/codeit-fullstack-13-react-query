# 위클리 미션 설계 — 판다마켓 인증 + 상품 상세

## 개요

기존 Next.js 학습 프로젝트에 판다마켓 인증(로그인/회원가입)과 상품 상세 페이지를 추가한다.
API: `https://panda-market-api.vercel.app`
React Query(`@tanstack/react-query`)를 모든 API 호출에 활용한다.

---

## 페이지 구조

| 경로 | 페이지 | 설명 |
|---|---|---|
| `/login` | 로그인 | 이메일/비밀번호 입력, JWT 발급 |
| `/signup` | 회원가입 | 이메일/닉네임/비밀번호 입력 |
| `/products` | 상품 목록 | 로그인 성공 후 이동 목적지, prefetch 기점 |
| `/products/[id]` | 상품 상세 | useQuery + prefetch 수신 |

기존 `/` (투두리스트)와 `/[id]` (투두 상세)는 건드리지 않는다.

---

## 공통 컴포넌트

### `src/components/AuthGNB.jsx`
- 판다마켓 로고(텍스트+아이콘)만 중앙 표시
- 로그인/회원가입 페이지 상단에서 공통 사용

### `src/components/Modal.jsx`
- `message`, `onClose` props
- 흰 카드 + 확인 버튼
- 서버 에러 발생 시 사용

### `src/components/PasswordInput.jsx`
- 눈 아이콘으로 비밀번호 show/hide 토글
- 로그인/회원가입 모두 사용

---

## 로그인 페이지 (`/login`)

### UI
- AuthGNB (로고)
- 이메일 input
- 비밀번호 input (PasswordInput)
- 로그인 버튼 (이메일+비밀번호 모두 입력 시 활성화)
- 간편 로그인 Google/Kakao 아이콘 (UI만, 기능 없음)
- 하단: "판다마켓이 처음이신가요? 회원가입" → `/signup`

### 동작
- Enter키로 폼 제출 가능
- `useMutation` → `POST /auth/signIn`
- **성공**: `accessToken` localStorage 저장 → `/products` 이동
- **실패(API 에러)**: 이메일 input 아래 "이메일을 확인해 주세요.", 비밀번호 input 아래 "비밀번호를 확인해 주세요." 인라인 에러
- **서버 에러(500 등)**: Modal로 에러 메시지 표시

---

## 회원가입 페이지 (`/signup`)

### UI
- AuthGNB (로고)
- 이메일 input
- 닉네임 input
- 비밀번호 input (PasswordInput)
- 비밀번호 확인 input (PasswordInput)
- 회원가입 버튼 (모든 필드 입력 시 활성화)
- 간편 로그인 Google/Kakao 아이콘 (UI만)
- 하단: "이미 회원이신가요? 로그인하기" → `/login`

### 동작
- Enter키로 폼 제출 가능
- **클라이언트 유효성**: 비밀번호 ≠ 비밀번호 확인 → 확인 input 아래 "비밀번호가 일치하지 않아요." (API 호출 안 함)
- `useMutation` → `POST /auth/signUp` (`{ email, nickname, password, passwordConfirmation }`)
- **성공**: `/products` 이동
- **실패(중복 이메일 등)**: Modal로 서버 에러 메시지 표시

---

## 상품 목록 페이지 (`/products`)

### 역할
- 로그인/회원가입 후 이동 목적지
- `useQuery` → `GET /products?page=1&pageSize=10`
- `staleTime: 60_000`, `refetchInterval: 60_000` (1분 자동 갱신)
- 각 상품 카드에 hover 시 `queryClient.prefetchQuery(['product', id])` 호출

### UI
- 상품 카드 목록 (이름, 가격, 이미지, 좋아요 수)
- 로딩 인디케이터
- 에러 메시지

---

## 상품 상세 페이지 (`/products/[id]`)

### 동작
- `useQuery(['product', id])` → `GET /products/:id`
- 목록에서 prefetch된 경우 캐시 즉시 사용 (로딩 없음)
- `staleTime: 60_000`

### UI
- 이미지, 이름, 가격, 태그, 좋아요 수, 설명, 작성자 닉네임
- 로딩 인디케이터
- 에러 메시지
- ← 목록으로 돌아가기 버튼

---

## 서비스 레이어

### `src/lib/services/auth.js`
```js
signIn(email, password)         // POST /auth/signIn
signUp(email, nickname, password, passwordConfirmation)  // POST /auth/signUp
```

### `src/lib/services/products.js`
```js
fetchProducts(page, pageSize)   // GET /products
fetchProduct(id)                // GET /products/:id
```

---

## React Query 셋업

`src/app/layout.jsx`에 `QueryClientProvider` 추가.
`QueryClient` 옵션: `defaultOptions.queries.staleTime = 60_000`

---

## 설치 패키지

```
@tanstack/react-query
```

---

## 제외 범위

- 소셜 로그인(Google/Kakao) 기능 구현 — UI만
- refreshToken 자동 갱신
- 로그인 상태에 따른 페이지 보호(guard)
- 상품 즐겨찾기(favoriteCount 토글)
