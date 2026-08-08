"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { NAV_ITEMS, FAVORITABLE_TOOL_IDS } from "@/lib/nav-items";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/lib/auth-context";
import { getFavorites, addFavorite, removeFavorite } from "@/lib/api";
import {
  AiIcon,
  WritingIcon,
  CalculatorIcon,
  TextIcon,
  DevIcon,
  FilesIcon,
  QrIcon,
  RandomIcon,
  StudentIcon,
} from "@/components/category-icons";

function StarIcon({ filled }: { filled: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="18"
      height="18"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path
        d="M12 3.5l2.55 5.17 5.7.83-4.13 4.02.98 5.68L12 16.4l-5.1 2.8.98-5.68-4.13-4.02 5.7-.83L12 3.5z"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const CATEGORY_META: Record<
  string,
  { Icon: (props: { className?: string }) => React.ReactElement; description: string }
> = {
  "/ai": { Icon: AiIcon, description: "AI로 글을 검사하고 다듬어요" },
  "/writing": { Icon: WritingIcon, description: "요약·번역·첨삭까지" },
  "/calculator": { Icon: CalculatorIcon, description: "일반·BMI·할인·나이 계산" },
  "/text": { Icon: TextIcon, description: "글자수·단어수·읽는 시간" },
  "/dev": { Icon: DevIcon, description: "JSON·UUID·Base64·Hash" },
  "/files": { Icon: FilesIcon, description: "이미지 압축·PDF 합치기" },
  "/qr": { Icon: QrIcon, description: "QR 코드 생성 및 스캔" },
  "/random": { Icon: RandomIcon, description: "번호·추첨·비밀번호 생성" },
  "/student": { Icon: StudentIcon, description: "과제·자소서·발표 준비" },
};

export default function Home() {
  const { user } = useAuth();
  // toolId -> favoriteId
  const [favorites, setFavorites] = useState<Map<string, string>>(new Map());

  useEffect(() => {
    if (!user) {
      setFavorites(new Map());
      return;
    }
    getFavorites().then((list) => {
      setFavorites(new Map(list.map((f) => [f.toolId, f.id])));
    });
  }, [user]);

  async function toggleFavorite(toolId: string) {
    const existingId = favorites.get(toolId);
    if (existingId) {
      setFavorites((prev) => {
        const next = new Map(prev);
        next.delete(toolId);
        return next;
      });
      await removeFavorite(existingId).catch(() => {
        setFavorites((prev) => new Map(prev).set(toolId, existingId));
      });
    } else {
      const favorite = await addFavorite(toolId).catch(() => null);
      if (favorite) {
        setFavorites((prev) => new Map(prev).set(toolId, favorite.id));
      }
    }
  }

  const categories = NAV_ITEMS.filter(
    (item) => item.href !== "/favorites" && item.href !== "/me",
  );

  return (
    <div className="flex flex-col gap-10">
      <section className="flex flex-col items-center gap-4 py-8 text-center">
        <span className="rounded-full border px-3 py-1 text-xs font-medium text-muted-foreground">
          학생 · 직장인 · 개발자를 위한 생산성 도구
        </span>
        <h1 className="bg-gradient-to-br from-foreground to-primary bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl">
          ToolHub AI
        </h1>
        <p className="max-w-md text-muted-foreground">
          글자수 세기부터 QR, PDF, 개발자 도구까지 — 설치 없이 브라우저에서
          바로 씁니다.
        </p>
      </section>

      <section className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
        {categories.map((item) => {
          const toolId = item.href.slice(1);
          const favoritable = user && FAVORITABLE_TOOL_IDS.has(toolId);
          const isFavorited = favorites.has(toolId);
          const meta = CATEGORY_META[item.href];

          return (
            <div key={item.href} className="group relative">
              <Link href={item.href}>
                <Card className="h-full gap-2 transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md">
                  <CardHeader className="gap-1">
                    <span className="flex size-10 items-center justify-center rounded-xl bg-accent text-accent-foreground">
                      {meta ? <meta.Icon /> : null}
                    </span>
                    <CardTitle className="pt-1">{item.label}</CardTitle>
                    {meta?.description && (
                      <p className="text-xs text-muted-foreground">
                        {meta.description}
                      </p>
                    )}
                  </CardHeader>
                </Card>
              </Link>
              {favoritable && (
                <button
                  type="button"
                  aria-label={isFavorited ? "즐겨찾기 해제" : "즐겨찾기 추가"}
                  onClick={() => toggleFavorite(toolId)}
                  className={`absolute right-2 top-2 rounded-full p-1 opacity-0 transition-opacity group-hover:opacity-100 ${
                    isFavorited
                      ? "text-yellow-500 opacity-100"
                      : "text-muted-foreground hover:text-yellow-500"
                  }`}
                >
                  <StarIcon filled={isFavorited} />
                </button>
              )}
            </div>
          );
        })}
      </section>
    </div>
  );
}
