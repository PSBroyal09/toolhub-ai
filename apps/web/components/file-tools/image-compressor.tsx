"use client";

import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { convertImage, formatBytes } from "@/lib/image-tools";

export function ImageCompressor() {
  const [file, setFile] = useState<File | null>(null);
  const [quality, setQuality] = useState("0.7");
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [resultSize, setResultSize] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function compress() {
    if (!file) return;
    setError(null);
    try {
      const blob = await convertImage(file, "image/jpeg", parseFloat(quality));
      setResultUrl(URL.createObjectURL(blob));
      setResultSize(blob.size);
    } catch {
      setError("압축에 실패했습니다.");
    }
  }

  return (
    <div className="flex max-w-sm flex-col gap-4">
      <Button variant="outline" onClick={() => fileInputRef.current?.click()}>
        이미지 선택
      </Button>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) {
            setFile(f);
            setResultUrl(null);
          }
        }}
      />

      {file && (
        <p className="text-sm text-muted-foreground">
          {file.name} ({formatBytes(file.size)})
        </p>
      )}

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="quality">압축 품질 ({Math.round(parseFloat(quality) * 100)}%)</Label>
        <input
          id="quality"
          type="range"
          min="0.1"
          max="1"
          step="0.05"
          value={quality}
          onChange={(e) => setQuality(e.target.value)}
        />
      </div>

      <Button onClick={compress} disabled={!file} className="w-fit">
        압축하기
      </Button>

      {error && <p className="text-sm text-destructive">{error}</p>}

      {resultUrl && resultSize !== null && file && (
        <Card>
          <CardContent className="flex flex-col gap-2 text-sm">
            <p>
              {formatBytes(file.size)} → {formatBytes(resultSize)} (
              {Math.round((1 - resultSize / file.size) * 100)}% 감소)
            </p>
            <Button
              variant="outline"
              size="sm"
              nativeButton={false}
              render={<a href={resultUrl} download="compressed.jpg" />}
            >
              다운로드
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
