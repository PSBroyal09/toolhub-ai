# ToolHub AI

학생, 직장인, 개발자를 위한 올인원 생산성 도구 플랫폼.

## 구조

```
Tool_Hub/
├── apps/
│   ├── web/   # Next.js 프론트엔드 (App Router, TypeScript, Tailwind, shadcn/ui)
│   └── api/   # NestJS 백엔드 (Prisma, PostgreSQL, JWT 인증)
├── docker-compose.yml   # 로컬 PostgreSQL + Redis
├── pnpm-workspace.yaml
└── turbo.json
```

## 사전 준비

- Node.js 20+
- pnpm (`corepack enable` 또는 `npm i -g pnpm`)
- Docker Desktop (로컬 PostgreSQL / Redis 구동용)

## 로컬 실행

1. 의존성 설치

   ```bash
   pnpm install
   ```

2. 환경변수 설정

   ```bash
   cp apps/api/.env.example apps/api/.env
   cp apps/web/.env.example apps/web/.env.local
   ```

3. DB / Redis 기동 (Docker Desktop 필요)

   ```bash
   docker compose up -d
   ```

4. DB 스키마 적용

   ```bash
   pnpm --filter api exec prisma migrate dev
   ```

5. 개발 서버 실행 (루트에서 web + api 동시 실행)

   ```bash
   pnpm dev
   ```

   - 프론트엔드: http://localhost:3000
   - 백엔드: http://localhost:3001

## 빌드

```bash
pnpm turbo build
```

## 구현된 기능 (뼈대 수준)

- `POST /auth/signup`, `POST /auth/login`, `POST /auth/logout`, `GET /auth/me` — JWT(httpOnly 쿠키) 기반 인증
- `GET/PATCH /users/profile`
- `GET/POST /favorites`, `DELETE /favorites/:id`
- 프론트엔드: 메인 네비게이션(AI/글쓰기/계산기/텍스트/개발자/파일/QR/학생/즐겨찾기/마이페이지), 로그인/회원가입 폼, 즐겨찾기/마이페이지 (로그인 필요)

글자수 세기, 계산기, AI 검사 등 개별 도구 기능은 아직 구현되지 않은 "준비 중" 상태이며 다음 단계에서 채워 넣으면 됩니다.
