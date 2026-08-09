# ToolHub AI

학생, 직장인, 개발자를 위한 올인원 생산성 도구 플랫폼.

## 구조

```
toolhub-ai/
├── apps/
│   ├── web/   # Next.js 프론트엔드 (App Router, TypeScript, Tailwind, shadcn/ui)
│   └── api/   # NestJS 백엔드 (Prisma, PostgreSQL, JWT 인증)
├── docker-compose.yml   # 로컬 PostgreSQL + Redis
├── pnpm-workspace.yaml
└── turbo.json
```

## 사전 준비

- Node.js 22.13+
- pnpm 11 (`corepack enable` 또는 `npm i -g pnpm`)
- Docker Desktop (로컬 PostgreSQL / Redis 구동용)

## 로컬 실행

1. 의존성 설치

   ```bash
   pnpm install
   ```

2. 환경변수 설정 (`apps/web`은 기본값이 `localhost:3001`이라 별도 설정 없이도 동작합니다)

   ```bash
   cp apps/api/.env.example apps/api/.env
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

## 배포

- 백엔드(`apps/api`)는 Railway(Nixpacks 빌드, `railway.json`/`nixpacks.toml`)에 배포됩니다.
  시작 시 `prisma migrate deploy` + 시드 스크립트를 자동 실행합니다.
- 프론트엔드(`apps/web`)는 API 호출을 Next.js rewrites로 프록시해 크로스사이트 쿠키 유실 문제를 피합니다.

## 구현된 기능

**인증 / 사용자**
- `POST /auth/signup`, `POST /auth/login`, `POST /auth/logout`, `GET /auth/me` — JWT(httpOnly 쿠키) 기반 인증
- `GET/PATCH /users/profile`
- `GET/POST /favorites`, `DELETE /favorites/:id`
- `ADMIN_EMAILS`에 등록된 이메일은 가입/로그인 시 자동으로 관리자 권한 부여, `/admin`에서 대시보드 통계 확인

**프론트엔드 네비게이션**: 개발자 / AI / 글쓰기 / 계산기 / 텍스트 / 파일 / QR / 랜덤 / 학생 / 즐겨찾기 / 마이페이지 (+로그인 시 관리자)

**실제로 동작하는 도구**
- **계산기**: 나이, BMI, 날짜, 할인율, 퍼센트, 일반 계산기
- **텍스트**: 글자수 세기 (공백 포함/제외, 단어/줄/문단/바이트 수, 읽기·말하기 예상 시간)
- **개발자**: JSON 포매터, Base64, JWT 디코더, 정규식 테스터, 텍스트 diff, 타임스탬프 변환, URL 인코딩, UUID 생성, cron 파서, 해시 생성기
- **파일**: 이미지 압축/변환, PDF 병합/분할
- **QR**: QR 생성 · 스캔
- **랜덤**: 랜덤 번호, 랜덤 추첨, 랜덤 비밀번호, 랜덤 닉네임

즐겨찾기 가능한 도구는 텍스트/계산기/개발자/랜덤/QR/파일 카테고리입니다 (`FAVORITABLE_TOOL_IDS` 참고).

**아직 "준비 중" 플레이스홀더인 카테고리**: AI, 글쓰기, 학생
