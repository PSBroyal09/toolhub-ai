"use client";

import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export function RandomDraw() {
  const [names, setNames] = useState("");
  const [winnerCount, setWinnerCount] = useState("1");
  const [winners, setWinners] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  function draw() {
    const pool = names
      .split("\n")
      .map((n) => n.trim())
      .filter((n) => n !== "");

    const n = Math.max(parseInt(winnerCount, 10) || 1, 1);

    if (pool.length === 0) {
      setError("추첨할 이름/항목을 한 줄에 하나씩 입력하세요.");
      return;
    }
    if (n > pool.length) {
      setError("당첨 인원이 참가자 수보다 많습니다.");
      return;
    }

    setError(null);
    const shuffled = [...pool];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    setWinners(shuffled.slice(0, n));
  }

  return (
    <div className="flex max-w-md flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="draw-names">참가자 목록 (한 줄에 하나씩)</Label>
        <Textarea
          id="draw-names"
          value={names}
          onChange={(e) => setNames(e.target.value)}
          placeholder={"철수\n영희\n민수"}
          className="min-h-[160px]"
        />
      </div>

      <div className="flex items-end gap-2">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="draw-count">당첨 인원</Label>
          <Input
            id="draw-count"
            type="number"
            min={1}
            value={winnerCount}
            onChange={(e) => setWinnerCount(e.target.value)}
            className="w-24"
          />
        </div>
        <Button onClick={draw}>추첨</Button>
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}

      {winners.length > 0 && (
        <Card>
          <CardContent className="flex flex-wrap gap-2">
            {winners.map((w, i) => (
              <span
                key={i}
                className="rounded-md bg-muted px-2.5 py-1 text-sm font-medium"
              >
                {w}
              </span>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
