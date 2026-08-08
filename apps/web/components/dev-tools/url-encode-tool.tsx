"use client";

import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export function UrlEncodeTool() {
  const [text, setText] = useState("");
  const [error, setError] = useState<string | null>(null);

  function encode() {
    setText(encodeURIComponent(text));
    setError(null);
  }

  function decode() {
    try {
      setText(decodeURIComponent(text));
      setError(null);
    } catch {
      setError("올바르게 인코딩된 URL 문자열이 아닙니다.");
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
        placeholder="URL 또는 인코딩된 문자열을 입력하세요"
        className="min-h-[200px] font-mono text-sm"
      />
      <div className="flex gap-2">
        <Button variant="outline" onClick={encode}>
          인코딩
        </Button>
        <Button variant="outline" onClick={decode}>
          디코딩
        </Button>
      </div>
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
}
