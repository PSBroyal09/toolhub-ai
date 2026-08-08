"use client";

import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export function JsonFormatter() {
  const [text, setText] = useState("");
  const [error, setError] = useState<string | null>(null);

  function format(indent: number | null) {
    try {
      const parsed = JSON.parse(text);
      setText(JSON.stringify(parsed, null, indent ?? undefined));
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "JSON 파싱에 실패했습니다.");
    }
  }

  return (
    <div className="flex flex-col gap-3">
      <Textarea
        value={text}
        onChange={(e) => {
          setText(e.target.value);
          setError(null);
        }}
        placeholder='{"hello": "world"}'
        className="min-h-[280px] font-mono text-sm"
      />
      <div className="flex gap-2">
        <Button variant="outline" onClick={() => format(2)}>
          포맷
        </Button>
        <Button variant="outline" onClick={() => format(null)}>
          압축
        </Button>
      </div>
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
}
