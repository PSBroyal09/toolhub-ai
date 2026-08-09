"use client";

import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const FLAG_OPTIONS = [
  { flag: "g", label: "전역(g)" },
  { flag: "i", label: "대소문자 무시(i)" },
  { flag: "m", label: "여러 줄(m)" },
  { flag: "s", label: "줄바꿈 포함(s)" },
] as const;

export function RegexTester() {
  const [pattern, setPattern] = useState("");
  const [flags, setFlags] = useState<Set<string>>(new Set(["g"]));
  const [text, setText] = useState("");

  function toggleFlag(flag: string) {
    setFlags((prev) => {
      const next = new Set(prev);
      if (next.has(flag)) next.delete(flag);
      else next.add(flag);
      return next;
    });
  }

  const result = useMemo(() => {
    if (!pattern) return null;
    try {
      const regex = new RegExp(pattern, Array.from(flags).join(""));
      if (!text) return { matches: [] as RegExpMatchArray[] };
      const matches = regex.global
        ? Array.from(text.matchAll(regex))
        : (() => {
            const m = text.match(regex);
            return m ? [m] : [];
          })();
      return { matches };
    } catch (e) {
      return { error: e instanceof Error ? e.message : "잘못된 정규식입니다." };
    }
  }, [pattern, flags, text]);

  const highlighted = useMemo(() => {
    if (!result || "error" in result || result.matches.length === 0) return null;
    const parts: { text: string; matched: boolean }[] = [];
    let cursor = 0;
    for (const match of result.matches) {
      const index = match.index ?? 0;
      if (index > cursor) parts.push({ text: text.slice(cursor, index), matched: false });
      parts.push({ text: match[0], matched: true });
      cursor = index + match[0].length;
      if (match[0].length === 0) cursor += 1; // 빈 매치 무한루프 방지
    }
    if (cursor < text.length) parts.push({ text: text.slice(cursor), matched: false });
    return parts;
  }, [result, text]);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="regex-pattern">정규식 패턴</Label>
        <div className="flex items-center gap-1 font-mono text-sm">
          <span className="text-muted-foreground">/</span>
          <Input
            id="regex-pattern"
            value={pattern}
            onChange={(e) => setPattern(e.target.value)}
            placeholder="[a-z]+@[a-z]+\.com"
            className="font-mono"
          />
          <span className="text-muted-foreground">/{Array.from(flags).join("")}</span>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {FLAG_OPTIONS.map(({ flag, label }) => (
          <Button
            key={flag}
            type="button"
            size="sm"
            variant={flags.has(flag) ? "default" : "outline"}
            onClick={() => toggleFlag(flag)}
          >
            {label}
          </Button>
        ))}
      </div>

      <Textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="테스트할 텍스트를 입력하세요"
        className="min-h-[140px] font-mono text-sm"
      />

      {result && "error" in result && (
        <p className="text-sm text-destructive">{result.error}</p>
      )}

      {highlighted && (
        <Card>
          <CardContent className="whitespace-pre-wrap break-all font-mono text-sm">
            {highlighted.map((part, i) =>
              part.matched ? (
                <mark key={i} className="rounded bg-primary/20 text-foreground">
                  {part.text}
                </mark>
              ) : (
                <span key={i}>{part.text}</span>
              ),
            )}
          </CardContent>
        </Card>
      )}

      {result && !("error" in result) && (
        <p className="text-xs text-muted-foreground">
          매치 {result.matches.length}건
        </p>
      )}
    </div>
  );
}
