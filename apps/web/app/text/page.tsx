"use client";

import { useMemo, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { PageHeader } from "@/components/page-header";
import { computeTextStats, formatDuration } from "@/lib/text-stats";

export default function TextPage() {
  const [text, setText] = useState("");
  const stats = useMemo(() => computeTextStats(text), [text]);

  const items = [
    { label: "글자수 (공백 포함)", value: stats.charsWithSpaces.toLocaleString() },
    { label: "글자수 (공백 제외)", value: stats.charsWithoutSpaces.toLocaleString() },
    { label: "단어 수", value: stats.words.toLocaleString() },
    { label: "줄 수", value: stats.lines.toLocaleString() },
    { label: "문단 수", value: stats.paragraphs.toLocaleString() },
    { label: "바이트 수", value: stats.bytes.toLocaleString() },
    { label: "읽는 시간", value: formatDuration(stats.readingSeconds) },
    { label: "말하는 시간", value: formatDuration(stats.speakingSeconds) },
  ];

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="글자수 세기"
        description="텍스트를 입력하면 실시간으로 통계가 계산됩니다."
      />

      <Textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="여기에 텍스트를 입력하세요..."
        className="min-h-[240px]"
      />

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {items.map((item) => (
          <Card key={item.label}>
            <CardContent className="flex flex-col gap-1">
              <span className="text-xs text-muted-foreground">
                {item.label}
              </span>
              <span className="text-lg font-semibold">{item.value}</span>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
