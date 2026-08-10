"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import { getFavorites, removeFavorite, type Favorite } from "@/lib/api";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/page-header";

export default function FavoritesPage() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [loading, user, router]);

  useEffect(() => {
    if (!user) return;
    getFavorites()
      .then(setFavorites)
      .finally(() => setFetching(false));
  }, [user]);

  async function handleRemove(favoriteId: string) {
    setFavorites((prev) => prev.filter((f) => f.id !== favoriteId));
    await removeFavorite(favoriteId).catch(() => {
      // 실패하면 목록을 다시 불러와 실제 상태로 맞춘다.
      getFavorites().then(setFavorites);
    });
  }

  if (loading || !user) {
    return null;
  }

  return (
    <div className="flex flex-col gap-4">
      <PageHeader title="즐겨찾기" description="자주 쓰는 도구를 모아두고 바로 열어보세요." />
      {fetching ? (
        <p className="text-muted-foreground">불러오는 중...</p>
      ) : favorites.length === 0 ? (
        <p className="text-muted-foreground">
          즐겨찾기한 도구가 없습니다. 메인 화면 카드의 별 아이콘으로 추가할
          수 있습니다.
        </p>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {favorites.map((fav) => (
            <div key={fav.id} className="flex flex-col gap-2">
              <Link href={`/${fav.tool.id}`}>
                <Card className="transition-colors hover:bg-accent">
                  <CardHeader>
                    <CardTitle>{fav.tool.title}</CardTitle>
                  </CardHeader>
                </Card>
              </Link>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleRemove(fav.id)}
                className="w-fit"
              >
                즐겨찾기 해제
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
