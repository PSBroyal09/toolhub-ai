"use client";

import { useRef, useState } from "react";
import { PDFDocument } from "pdf-lib";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export function PdfMerge() {
  const [files, setFiles] = useState<File[]>([]);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [merging, setMerging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  function removeFile(index: number) {
    setFiles((prev) => prev.filter((_, i) => i !== index));
    setResultUrl(null);
  }

  async function merge() {
    if (files.length < 2) {
      setError("합칠 PDF를 2개 이상 선택하세요.");
      return;
    }
    setError(null);
    setMerging(true);
    try {
      const mergedPdf = await PDFDocument.create();
      for (const file of files) {
        const bytes = await file.arrayBuffer();
        const src = await PDFDocument.load(bytes);
        const pages = await mergedPdf.copyPages(src, src.getPageIndices());
        pages.forEach((page) => mergedPdf.addPage(page));
      }
      const mergedBytes = await mergedPdf.save();
      const blob = new Blob([mergedBytes as BlobPart], { type: "application/pdf" });
      setResultUrl(URL.createObjectURL(blob));
    } catch {
      setError("PDF를 합치는 중 오류가 발생했습니다. 올바른 PDF 파일인지 확인하세요.");
    } finally {
      setMerging(false);
    }
  }

  return (
    <div className="flex max-w-sm flex-col gap-4">
      <Button variant="outline" onClick={() => fileInputRef.current?.click()}>
        PDF 추가
      </Button>
      <input
        ref={fileInputRef}
        type="file"
        accept="application/pdf"
        multiple
        className="hidden"
        onChange={(e) => {
          const newFiles = Array.from(e.target.files ?? []);
          setFiles((prev) => [...prev, ...newFiles]);
          setResultUrl(null);
          e.target.value = "";
        }}
      />

      {files.length > 0 && (
        <Card>
          <CardContent className="flex flex-col gap-1 text-sm">
            {files.map((f, i) => (
              <div key={i} className="flex items-center justify-between gap-2">
                <span className="truncate">
                  {i + 1}. {f.name}
                </span>
                <button
                  onClick={() => removeFile(i)}
                  className="text-xs text-muted-foreground hover:text-destructive"
                >
                  제거
                </button>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      <Button onClick={merge} disabled={merging || files.length < 2} className="w-fit">
        {merging ? "합치는 중..." : "PDF 합치기"}
      </Button>

      {error && <p className="text-sm text-destructive">{error}</p>}

      {resultUrl && (
        <Button
          variant="outline"
          size="sm"
          nativeButton={false}
          render={<a href={resultUrl} download="merged.pdf" />}
          className="w-fit"
        >
          다운로드
        </Button>
      )}
    </div>
  );
}
