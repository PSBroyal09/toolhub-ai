"use client";

import { useMemo, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";

type DiffLine = { type: "same" | "added" | "removed"; text: string };

// 두 줄 배열의 최장 공통 부분열(LCS)을 기반으로 한 줄 단위 diff.
function diffLines(a: string[], b: string[]): DiffLine[] {
  const n = a.length;
  const m = b.length;
  const dp: number[][] = Array.from({ length: n + 1 }, () => new Array(m + 1).fill(0));
  for (let i = n - 1; i >= 0; i--) {
    for (let j = m - 1; j >= 0; j--) {
      dp[i][j] = a[i] === b[j] ? dp[i + 1][j + 1] + 1 : Math.max(dp[i + 1][j], dp[i][j + 1]);
    }
  }
  const result: DiffLine[] = [];
  let i = 0;
  let j = 0;
  while (i < n && j < m) {
    if (a[i] === b[j]) {
      result.push({ type: "same", text: a[i] });
      i++;
      j++;
    } else if (dp[i + 1][j] >= dp[i][j + 1]) {
      result.push({ type: "removed", text: a[i] });
      i++;
    } else {
      result.push({ type: "added", text: b[j] });
      j++;
    }
  }
  while (i < n) result.push({ type: "removed", text: a[i++] });
  while (j < m) result.push({ type: "added", text: b[j++] });
  return result;
}

const LINE_STYLE: Record<DiffLine["type"], string> = {
  same: "",
  added: "bg-green-500/15 text-green-700 dark:text-green-400",
  removed: "bg-red-500/15 text-red-700 dark:text-red-400 line-through decoration-1",
};

export function TextDiff() {
  const [original, setOriginal] = useState("");
  const [changed, setChanged] = useState("");

  const lines = useMemo(() => {
    if (!original && !changed) return [];
    return diffLines(original.split("\n"), changed.split("\n"));
  }, [original, changed]);

  const stats = useMemo(() => {
    const added = lines.filter((l) => l.type === "added").length;
    const removed = lines.filter((l) => l.type === "removed").length;
    return { added, removed };
  }, [lines]);

  return (
    <div className="flex flex-col gap-3">
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="diff-original">원본</Label>
          <Textarea
            id="diff-original"
            value={original}
            onChange={(e) => setOriginal(e.target.value)}
            className="min-h-[160px] font-mono text-sm"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="diff-changed">변경본</Label>
          <Textarea
            id="diff-changed"
            value={changed}
            onChange={(e) => setChanged(e.target.value)}
            className="min-h-[160px] font-mono text-sm"
          />
        </div>
      </div>

      {lines.length > 0 && (
        <>
          <p className="text-xs text-muted-foreground">
            추가 {stats.added}줄 · 삭제 {stats.removed}줄
          </p>
          <Card>
            <CardContent className="overflow-x-auto p-0">
              <pre className="text-sm">
                {lines.map((line, i) => (
                  <div key={i} className={`px-3 py-0.5 font-mono ${LINE_STYLE[line.type]}`}>
                    <span className="mr-2 select-none text-muted-foreground">
                      {line.type === "added" ? "+" : line.type === "removed" ? "-" : " "}
                    </span>
                    {line.text || " "}
                  </div>
                ))}
              </pre>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
