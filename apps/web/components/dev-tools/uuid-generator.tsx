"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";

export function UuidGenerator() {
  const [count, setCount] = useState("5");
  const [uuids, setUuids] = useState<string[]>([]);

  function generate() {
    const n = Math.min(Math.max(parseInt(count, 10) || 1, 1), 100);
    setUuids(Array.from({ length: n }, () => crypto.randomUUID()));
  }

  function copyAll() {
    navigator.clipboard?.writeText(uuids.join("\n"));
  }

  return (
    <div className="flex max-w-md flex-col gap-4">
      <div className="flex items-end gap-2">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="uuid-count">생성 개수</Label>
          <Input
            id="uuid-count"
            type="number"
            min={1}
            max={100}
            value={count}
            onChange={(e) => setCount(e.target.value)}
            className="w-24"
          />
        </div>
        <Button onClick={generate}>생성</Button>
        {uuids.length > 0 && (
          <Button variant="outline" onClick={copyAll}>
            전체 복사
          </Button>
        )}
      </div>

      {uuids.length > 0 && (
        <Card>
          <CardContent className="flex flex-col gap-1 font-mono text-sm">
            {uuids.map((id) => (
              <span key={id}>{id}</span>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
