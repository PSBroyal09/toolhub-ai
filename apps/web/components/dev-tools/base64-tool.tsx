"use client";

import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { utf8ToBase64, base64ToUtf8 } from "@/lib/encoding";

export function Base64Tool() {
  const [text, setText] = useState("");
  const [error, setError] = useState<string | null>(null);

  function encode() {
    try {
      setText(utf8ToBase64(text));
      setError(null);
    } catch {
      setError("인코딩에 실패했습니다.");
    }
  }

  function decode() {
    try {
      setText(base64ToUtf8(text));
      setError(null);
    } catch {
      setError("올바른 Base64 문자열이 아닙니다.");
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
        placeholder="텍스트 또는 Base64 문자열을 입력하세요"
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
