"use client";

import { useEffect, useState } from "react";
import QRCode from "qrcode";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export function QrGenerator() {
  const [text, setText] = useState("https://toolhub.ai");
  const [dataUrl, setDataUrl] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!text.trim()) {
      setDataUrl("");
      return;
    }
    let cancelled = false;
    QRCode.toDataURL(text, { width: 256, margin: 1 })
      .then((url) => {
        if (!cancelled) {
          setDataUrl(url);
          setError(null);
        }
      })
      .catch(() => {
        if (!cancelled) setError("QR 코드를 생성할 수 없습니다.");
      });
    return () => {
      cancelled = true;
    };
  }, [text]);

  return (
    <div className="flex max-w-sm flex-col gap-4">
      <Textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="QR로 변환할 텍스트 또는 URL"
        className="min-h-[100px]"
      />

      {error && <p className="text-sm text-destructive">{error}</p>}

      {dataUrl && (
        <Card>
          <CardContent className="flex flex-col items-center gap-3">
            <img src={dataUrl} alt="생성된 QR 코드" width={256} height={256} />
            <Button
              variant="outline"
              size="sm"
              nativeButton={false}
              render={<a href={dataUrl} download="qrcode.png" />}
            >
              PNG 다운로드
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
