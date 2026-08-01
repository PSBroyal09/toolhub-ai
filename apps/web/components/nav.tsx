"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_ITEMS } from "@/lib/nav-items";
import { useAuth } from "@/lib/auth-context";
import { Button } from "@/components/ui/button";

export function Nav() {
  const pathname = usePathname();
  const { user, loading, logout } = useAuth();

  return (
    <header className="border-b">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Link href="/" className="text-lg font-bold shrink-0">
          ToolHub AI
        </Link>

        <nav className="flex flex-1 flex-wrap gap-1 overflow-x-auto text-sm">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`rounded-md px-3 py-1.5 whitespace-nowrap hover:bg-accent hover:text-accent-foreground ${
                pathname === item.href
                  ? "bg-accent text-accent-foreground font-medium"
                  : "text-muted-foreground"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          {loading ? null : user ? (
            <>
              <span className="text-sm text-muted-foreground">
                {user.nickname}님
              </span>
              <Button variant="outline" size="sm" onClick={() => logout()}>
                로그아웃
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="ghost"
                size="sm"
                nativeButton={false}
                render={<Link href="/login" />}
              >
                로그인
              </Button>
              <Button
                size="sm"
                nativeButton={false}
                render={<Link href="/signup" />}
              >
                회원가입
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
