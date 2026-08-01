"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { getFavorites, type Favorite } from "@/lib/api";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";

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

  if (loading || !user) {
    return null;
  }

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">즐겨찾기</h1>
      {fetching ? (
        <p className="text-muted-foreground">불러오는 중...</p>
      ) : favorites.length === 0 ? (
        <p className="text-muted-foreground">즐겨찾기한 도구가 없습니다.</p>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {favorites.map((fav) => (
            <Card key={fav.id}>
              <CardHeader>
                <CardTitle>{fav.tool.title}</CardTitle>
              </CardHeader>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
