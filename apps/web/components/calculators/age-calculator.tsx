"use client";

import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";

export function AgeCalculator() {
  const [birthDate, setBirthDate] = useState("");

  const result = useMemo(() => {
    if (!birthDate) return null;
    const birth = new Date(birthDate);
    const today = new Date();
    if (isNaN(birth.getTime())) return null;

    let internationalAge = today.getFullYear() - birth.getFullYear();
    const hasHadBirthdayThisYear =
      today.getMonth() > birth.getMonth() ||
      (today.getMonth() === birth.getMonth() &&
        today.getDate() >= birth.getDate());
    if (!hasHadBirthdayThisYear) internationalAge -= 1;

    const koreanCountingAge = today.getFullYear() - birth.getFullYear() + 1;
    const yearAge = today.getFullYear() - birth.getFullYear();

    return { internationalAge, koreanCountingAge, yearAge };
  }, [birthDate]);

  return (
    <div className="flex max-w-sm flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="birth-date">생년월일</Label>
        <Input
          id="birth-date"
          type="date"
          value={birthDate}
          onChange={(e) => setBirthDate(e.target.value)}
        />
      </div>

      {result && (
        <Card>
          <CardContent className="flex flex-col gap-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">만 나이</span>
              <span className="font-semibold">{result.internationalAge}세</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">세는 나이</span>
              <span className="font-semibold">
                {result.koreanCountingAge}세
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">연 나이</span>
              <span className="font-semibold">{result.yearAge}세</span>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
