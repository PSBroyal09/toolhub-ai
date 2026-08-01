"use client";

import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";

const MS_PER_DAY = 1000 * 60 * 60 * 24;

export function DateCalculator() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const diffDays = useMemo(() => {
    if (!startDate || !endDate) return null;
    const start = new Date(startDate);
    const end = new Date(endDate);
    return Math.round((end.getTime() - start.getTime()) / MS_PER_DAY);
  }, [startDate, endDate]);

  const [baseDate, setBaseDate] = useState("");
  const [offsetDays, setOffsetDays] = useState("");
  const resultDate = useMemo(() => {
    if (!baseDate || offsetDays === "") return null;
    const base = new Date(baseDate);
    const offset = parseInt(offsetDays, 10);
    if (isNaN(offset)) return null;
    base.setDate(base.getDate() + offset);
    return base.toISOString().slice(0, 10);
  }, [baseDate, offsetDays]);

  return (
    <div className="flex max-w-sm flex-col gap-6">
      <div className="flex flex-col gap-2">
        <p className="text-sm font-medium">두 날짜 사이 일수</p>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="start-date">시작일</Label>
          <Input
            id="start-date"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="end-date">종료일</Label>
          <Input
            id="end-date"
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
        {diffDays !== null && (
          <Card>
            <CardContent className="text-lg font-semibold">
              {diffDays >= 0 ? `${diffDays}일` : `${-diffDays}일 전`}
            </CardContent>
          </Card>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-sm font-medium">날짜에 일수 더하기/빼기</p>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="base-date">기준일</Label>
          <Input
            id="base-date"
            type="date"
            value={baseDate}
            onChange={(e) => setBaseDate(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="offset-days">더할 일수 (음수 가능)</Label>
          <Input
            id="offset-days"
            type="number"
            value={offsetDays}
            onChange={(e) => setOffsetDays(e.target.value)}
            placeholder="예: 30 또는 -7"
          />
        </div>
        {resultDate && (
          <Card>
            <CardContent className="text-lg font-semibold">
              {resultDate}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
