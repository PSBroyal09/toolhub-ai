export const NAV_ITEMS = [
  { href: "/dev", label: "개발자" },
  { href: "/ai", label: "AI" },
  { href: "/writing", label: "글쓰기" },
  { href: "/calculator", label: "계산기" },
  { href: "/text", label: "텍스트" },
  { href: "/files", label: "파일" },
  { href: "/qr", label: "QR" },
  { href: "/random", label: "랜덤" },
  { href: "/student", label: "학생" },
  { href: "/favorites", label: "즐겨찾기" },
  { href: "/me", label: "마이페이지" },
] as const;

// 백엔드 Tool 시드 데이터(apps/api/prisma/seed.ts)와 짝이 맞는, 즐겨찾기가 가능한 도구의 id 목록.
// 각 id는 해당 도구 페이지의 href에서 앞의 "/"를 뗀 값과 동일하다.
export const FAVORITABLE_TOOL_IDS = new Set([
  "text",
  "calculator",
  "dev",
  "random",
  "qr",
  "files",
]);
