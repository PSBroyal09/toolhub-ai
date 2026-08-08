"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function RandomNumber() {
  const [min, setMin] = useState("1");
  const [max, setMax] = useState("100");
  const [count, setCount] = useState("1");
  const [allowDuplicates, setAllowDuplicates] = useState(true);
  const [results, setResults] = useState<number[]>([]);
  const [error, setError] = useState<string | null>(null);

  function generate() {
    const minN = parseInt(min, 10);
    const maxN = parseInt(max, 10);
    const countN = Math.min(Math.max(parseInt(count, 10) || 1, 1), 1000);

    if (isNaN(minN) || isNaN(maxN) || minN > maxN) {
      setError("최소값이 최대값보다 작아야 합니다.");
      return;
    }

    if (!allowDuplicates && countN > maxN - minN + 1) {
      setError("중복 없이 뽑기엔 범위보다 개수가 많습니다.");
      return;
    }

    setError(null);

    if (allowDuplicates) {
      setResults(Array.from({ length: countN }, () => randomInt(minN, maxN)));
      return;
    }

    const pool = Array.from({ length: maxN - minN + 1 }, (_, i) => minN + i);
    for (let i = pool.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [pool[i], pool[j]] = [pool[j], pool[i]];
    }
    setResults(pool.slice(0, countN));
  }

  return (
    <div className="flex max-w-md flex-col gap-4">
      <div className="grid grid-cols-3 gap-2">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="rn-min">최소</Label>
          <Input id="rn-min" type="number" value={min} onChange={(e) => setMin(e.target.value)} />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="rn-max">최대</Label>
          <Input id="rn-max" type="number" value={max} onChange={(e) => setMax(e.target.value)} />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="rn-count">개수</Label>
          <Input id="rn-count" type="number" min={1} max={1000} value={count} onChange={(e) => setCount(e.target.value)} />
        </div>
      </div>

      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={allowDuplicates}
          onChange={(e) => setAllowDuplicates(e.target.checked)}
        />
        중복 허용
      </label>

      <Button onClick={generate} className="w-fit">
        생성
      </Button>

      {error && <p className="text-sm text-destructive">{error}</p>}

      {results.length > 0 && (
        <Card>
          <CardContent className="flex flex-wrap gap-2">
            {results.map((n, i) => (
              <span
                key={i}
                className="rounded-md bg-muted px-2.5 py-1 font-mono text-sm"
              >
                {n}
              </span>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
