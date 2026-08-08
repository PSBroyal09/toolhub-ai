"use client";

import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { bufferToHex } from "@/lib/encoding";

const ALGORITHMS = ["SHA-1", "SHA-256", "SHA-384", "SHA-512"] as const;
type Algorithm = (typeof ALGORITHMS)[number];

export function HashGenerator() {
  const [text, setText] = useState("");
  const [algorithm, setAlgorithm] = useState<Algorithm>("SHA-256");
  const [hash, setHash] = useState("");

  async function generate() {
    const data = new TextEncoder().encode(text);
    const digest = await crypto.subtle.digest(algorithm, data);
    setHash(bufferToHex(digest));
  }

  return (
    <div className="flex flex-col gap-3">
      <Textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="해시로 변환할 텍스트를 입력하세요"
        className="min-h-[160px] font-mono text-sm"
      />

      <div className="flex flex-wrap gap-2">
        {ALGORITHMS.map((alg) => (
          <Button
            key={alg}
            size="sm"
            variant={algorithm === alg ? "default" : "outline"}
            onClick={() => setAlgorithm(alg)}
          >
            {alg}
          </Button>
        ))}
      </div>

      <Button onClick={generate} className="w-fit">
        해시 생성
      </Button>

      {hash && (
        <Card>
          <CardContent className="break-all font-mono text-sm">
            {hash}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
