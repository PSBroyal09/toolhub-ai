"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { getAdminStats, ApiError, type AdminStats } from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageHeader } from "@/components/page-header";

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <Card>
      <CardContent className="flex flex-col gap-1">
        <span className="text-xs text-muted-foreground">{label}</span>
        <span className="text-2xl font-semibold">{value.toLocaleString()}</span>
      </CardContent>
    </Card>
  );
}

export default function AdminPage() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (loading) return;
    if (!user) {
      router.push("/login");
      return;
    }
    if (user.role !== "ADMIN") {
      router.push("/");
      return;
    }
    getAdminStats()
      .then(setStats)
      .catch((err) => {
        if (err instanceof ApiError) {
          setError(`통계를 불러오지 못했습니다. (${err.status} ${err.message})`);
        } else {
          setError("통계를 불러오지 못했습니다. (네트워크 오류)");
        }
      });
  }, [loading, user, router]);

  if (loading || !user || user.role !== "ADMIN") {
    return null;
  }

  return (
    <div className="flex flex-col gap-6">
      <PageHeader title="관리자 대시보드" description="회원, 즐겨찾기, 도구 사용 현황을 한눈에 확인하세요." />

      {error && <p className="text-sm text-destructive">{error}</p>}

      {stats && (
        <>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            <StatCard label="전체 회원 수" value={stats.totalUsers} />
            <StatCard label="전체 즐겨찾기 수" value={stats.totalFavorites} />
            <StatCard label="등록된 도구 수" value={stats.totalTools} />
          </div>

          <Card>
            <CardHeader>
              <CardTitle>도구별 즐겨찾기 순위</CardTitle>
            </CardHeader>
            <CardContent>
              {stats.toolUsage.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                  아직 즐겨찾기 데이터가 없습니다.
                </p>
              ) : (
                <div className="flex flex-col gap-2">
                  {stats.toolUsage.map((tool) => (
                    <div
                      key={tool.toolId}
                      className="flex items-center justify-between text-sm"
                    >
                      <span>{tool.title}</span>
                      <span className="font-medium">{tool.favoriteCount}</span>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>최근 가입 회원</CardTitle>
            </CardHeader>
            <CardContent className="overflow-x-auto">
              <table className="w-full min-w-[420px] text-left text-sm">
                <thead>
                  <tr className="border-b text-xs text-muted-foreground">
                    <th className="py-2 font-medium">닉네임</th>
                    <th className="py-2 font-medium">이메일</th>
                    <th className="py-2 font-medium">권한</th>
                    <th className="py-2 font-medium">가입일</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.recentUsers.map((u) => (
                    <tr key={u.id} className="border-b last:border-0">
                      <td className="py-2">{u.nickname}</td>
                      <td className="py-2 text-muted-foreground">{u.email}</td>
                      <td className="py-2">{u.role === "ADMIN" ? "관리자" : "회원"}</td>
                      <td className="py-2 text-muted-foreground">
                        {new Date(u.createdAt).toLocaleDateString("ko-KR")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
