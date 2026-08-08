"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_ITEMS } from "@/lib/nav-items";
import { useAuth } from "@/lib/auth-context";
import { Button } from "@/components/ui/button";

function navLinkClass(active: boolean) {
  return `rounded-md px-3 py-1.5 whitespace-nowrap hover:bg-accent hover:text-accent-foreground ${
    active ? "bg-accent text-accent-foreground font-medium" : "text-muted-foreground"
  }`;
}

export function Nav() {
  const pathname = usePathname();
  const { user, loading, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const navItems =
    user?.role === "ADMIN"
      ? [...NAV_ITEMS, { href: "/admin", label: "관리자" }]
      : NAV_ITEMS;

  return (
    <header className="border-b">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Link href="/" className="text-lg font-bold shrink-0">
          ToolHub AI
        </Link>

        <nav className="hidden flex-1 items-center gap-1 overflow-x-auto text-sm md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={navLinkClass(pathname === item.href)}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden shrink-0 items-center gap-2 md:flex">
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

        <button
          type="button"
          className="flex size-8 shrink-0 items-center justify-center rounded-md hover:bg-accent md:hidden"
          aria-label={mobileOpen ? "메뉴 닫기" : "메뉴 열기"}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((open) => !open)}
        >
          {mobileOpen ? (
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" />
            </svg>
          )}
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t md:hidden">
          <nav className="flex flex-col gap-1 px-4 py-3 text-sm">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={navLinkClass(pathname === item.href)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="flex flex-col gap-2 border-t px-4 py-3">
            {loading ? null : user ? (
              <>
                <span className="text-sm text-muted-foreground">
                  {user.nickname}님
                </span>
                <Button variant="outline" size="sm" onClick={() => logout()} className="w-fit">
                  로그아웃
                </Button>
              </>
            ) : (
              <div className="flex gap-2">
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
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
