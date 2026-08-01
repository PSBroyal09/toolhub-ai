import Link from "next/link";
import { NAV_ITEMS } from "@/lib/nav-items";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
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
        {categories.map((item) => (
          <Link key={item.href} href={item.href}>
            <Card className="transition-colors hover:bg-accent">
              <CardHeader>
                <CardTitle>{item.label}</CardTitle>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </section>
    </div>
  );
}
