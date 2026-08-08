"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { NAV_ITEMS, FAVORITABLE_TOOL_IDS } from "@/lib/nav-items";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/lib/auth-context";
import { getFavorites, addFavorite, removeFavorite } from "@/lib/api";

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
    <div className="flex flex-col gap-8">
      <section>
        <h1 className="text-3xl font-bold">ToolHub AI</h1>
        <p className="mt-2 text-muted-foreground">
          학생, 직장인, 개발자를 위한 올인원 생산성 도구 플랫폼
        </p>
      </section>

      <section className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
        {categories.map((item) => {
          const toolId = item.href.slice(1);
          const favoritable = user && FAVORITABLE_TOOL_IDS.has(toolId);
          const isFavorited = favorites.has(toolId);

          return (
            <div key={item.href} className="relative">
              <Link href={item.href}>
                <Card className="transition-colors hover:bg-accent">
                  <CardHeader>
                    <CardTitle>{item.label}</CardTitle>
                  </CardHeader>
                </Card>
              </Link>
              {favoritable && (
                <button
                  type="button"
                  aria-label={isFavorited ? "즐겨찾기 해제" : "즐겨찾기 추가"}
                  onClick={() => toggleFavorite(toolId)}
                  className={`absolute right-2 top-2 rounded-full p-1 transition-colors ${
                    isFavorited
                      ? "text-yellow-500"
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
