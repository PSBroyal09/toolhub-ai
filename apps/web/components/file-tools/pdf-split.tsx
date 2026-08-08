"use client";

import { useRef, useState } from "react";
import { PDFDocument } from "pdf-lib";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { parsePageRange } from "@/lib/pdf-tools";

export function PdfSplit() {
  const [file, setFile] = useState<File | null>(null);
  const [pageCount, setPageCount] = useState<number | null>(null);
  const [range, setRange] = useState("");
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function handleFile(f: File) {
    setFile(f);
    setResultUrl(null);
    setError(null);
    try {
      const bytes = await f.arrayBuffer();
      const doc = await PDFDocument.load(bytes);
      setPageCount(doc.getPageCount());
    } catch {
      setError("PDF를 읽을 수 없습니다.");
      setPageCount(null);
    }
  }

  async function extract() {
    if (!file || !pageCount) return;
    const indices = parsePageRange(range, pageCount);
    if (indices.length === 0) {
      setError("유효한 페이지 범위를 입력하세요. (예: 1-3,5)");
      return;
    }
    setError(null);
    setProcessing(true);
    try {
      const bytes = await file.arrayBuffer();
      const src = await PDFDocument.load(bytes);
      const newDoc = await PDFDocument.create();
      const pages = await newDoc.copyPages(src, indices);
      pages.forEach((page) => newDoc.addPage(page));
      const newBytes = await newDoc.save();
      const blob = new Blob([newBytes as BlobPart], { type: "application/pdf" });
      setResultUrl(URL.createObjectURL(blob));
    } catch {
      setError("페이지 추출 중 오류가 발생했습니다.");
    } finally {
      setProcessing(false);
    }
  }

  return (
    <div className="flex max-w-sm flex-col gap-4">
      <Button variant="outline" onClick={() => fileInputRef.current?.click()}>
        PDF 선택
      </Button>
      <input
        ref={fileInputRef}
        type="file"
        accept="application/pdf"
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) handleFile(f);
        }}
      />

      {file && pageCount !== null && (
        <p className="text-sm text-muted-foreground">
          {file.name} (총 {pageCount}페이지)
        </p>
      )}

      {pageCount !== null && (
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="page-range">추출할 페이지 (예: 1-3,5)</Label>
          <Input
            id="page-range"
            value={range}
            onChange={(e) => setRange(e.target.value)}
            placeholder="1-3,5"
          />
        </div>
      )}

      <Button onClick={extract} disabled={!pageCount || processing} className="w-fit">
        {processing ? "추출 중..." : "페이지 추출"}
      </Button>

      {error && <p className="text-sm text-destructive">{error}</p>}

      {resultUrl && (
        <Button
          variant="outline"
          size="sm"
          nativeButton={false}
          render={<a href={resultUrl} download="split.pdf" />}
          className="w-fit"
        >
          다운로드
        </Button>
      )}
    </div>
  );
}
