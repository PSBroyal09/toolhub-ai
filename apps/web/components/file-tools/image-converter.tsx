"use client";

import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { convertImage, formatBytes } from "@/lib/image-tools";

const FORMATS = [
  { mime: "image/png", ext: "png", label: "PNG" },
  { mime: "image/jpeg", ext: "jpg", label: "JPG" },
  { mime: "image/webp", ext: "webp", label: "WebP" },
] as const;

export function ImageConverter() {
  const [file, setFile] = useState<File | null>(null);
  const [target, setTarget] = useState<(typeof FORMATS)[number]>(FORMATS[2]);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [resultSize, setResultSize] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function convert() {
    if (!file) return;
    setError(null);
    try {
      const blob = await convertImage(file, target.mime);
      setResultUrl(URL.createObjectURL(blob));
      setResultSize(blob.size);
    } catch {
      setError("변환에 실패했습니다. (이 브라우저가 해당 형식을 지원하지 않을 수 있습니다)");
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

      <div className="flex gap-2">
        {FORMATS.map((f) => (
          <Button
            key={f.mime}
            size="sm"
            variant={target.mime === f.mime ? "default" : "outline"}
            onClick={() => setTarget(f)}
          >
            {f.label}
          </Button>
        ))}
      </div>

      <Button onClick={convert} disabled={!file} className="w-fit">
        변환하기
      </Button>

      {error && <p className="text-sm text-destructive">{error}</p>}

      {resultUrl && resultSize !== null && (
        <Card>
          <CardContent className="flex flex-col gap-2 text-sm">
            <p>{formatBytes(resultSize)}</p>
            <Button
              variant="outline"
              size="sm"
              nativeButton={false}
              render={<a href={resultUrl} download={`converted.${target.ext}`} />}
            >
              다운로드
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
