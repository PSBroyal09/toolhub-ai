"use client";

import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

function toDatetimeLocalValue(date: Date) {
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
}

export function TimestampConverter() {
  const [timestamp, setTimestamp] = useState("");
  const [datetime, setDatetime] = useState("");

  const fromTimestamp = useMemo(() => {
    const trimmed = timestamp.trim();
    if (!trimmed || !/^-?\d+$/.test(trimmed)) return null;
    const num = Number(trimmed);
    // 13자리 이상이면 밀리초, 아니면 초 단위로 간주한다.
    const ms = trimmed.replace("-", "").length >= 13 ? num : num * 1000;
    const date = new Date(ms);
    if (Number.isNaN(date.getTime())) return null;
    return date;
  }, [timestamp]);

  const fromDatetime = useMemo(() => {
    if (!datetime) return null;
    const date = new Date(datetime);
    if (Number.isNaN(date.getTime())) return null;
    return date;
  }, [datetime]);

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <Label htmlFor="ts-input">Unix 타임스탬프 → 날짜</Label>
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={() => setTimestamp(String(Math.floor(Date.now() / 1000)))}
          >
            지금
          </Button>
        </div>
        <Input
          id="ts-input"
          value={timestamp}
          onChange={(e) => setTimestamp(e.target.value)}
          placeholder="1700000000 또는 1700000000000"
          className="font-mono"
        />
        {timestamp.trim() && !fromTimestamp && (
          <p className="text-sm text-destructive">유효한 타임스탬프가 아닙니다.</p>
        )}
        {fromTimestamp && (
          <Card>
            <CardContent className="flex flex-col gap-1 text-sm">
              <span>로컬: {fromTimestamp.toLocaleString("ko-KR")}</span>
              <span className="text-muted-foreground">UTC: {fromTimestamp.toUTCString()}</span>
              <span className="text-muted-foreground">ISO: {fromTimestamp.toISOString()}</span>
            </CardContent>
          </Card>
        )}
      </div>

      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <Label htmlFor="dt-input">날짜 → Unix 타임스탬프</Label>
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={() => setDatetime(toDatetimeLocalValue(new Date()))}
          >
            지금
          </Button>
        </div>
        <Input
          id="dt-input"
          type="datetime-local"
          step="1"
          value={datetime}
          onChange={(e) => setDatetime(e.target.value)}
        />
        {fromDatetime && (
          <Card>
            <CardContent className="flex flex-col gap-1 text-sm">
              <span>초: {Math.floor(fromDatetime.getTime() / 1000)}</span>
              <span className="text-muted-foreground">밀리초: {fromDatetime.getTime()}</span>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
