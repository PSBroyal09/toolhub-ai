"use client";

import { useRef, useState } from "react";
import jsQR from "jsqr";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export function QrScanner() {
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [scanning, setScanning] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const rafRef = useRef<number | null>(null);

  function decodeImageData(imageData: ImageData) {
    return jsQR(imageData.data, imageData.width, imageData.height);
  }

  function handleFile(file: File) {
    setError(null);
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.drawImage(img, 0, 0);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const code = decodeImageData(imageData);
      if (code) {
        setResult(code.data);
      } else {
        setError("이미지에서 QR 코드를 찾을 수 없습니다.");
        setResult(null);
      }
    };
    img.onerror = () => setError("이미지를 불러올 수 없습니다.");
    img.src = URL.createObjectURL(file);
  }

  async function startCamera() {
    setError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
      setScanning(true);
      tick();
    } catch {
      setError("카메라에 접근할 수 없습니다. 권한을 확인해주세요.");
    }
  }

  function stopCamera() {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
    setScanning(false);
  }

  function tick() {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas || video.readyState !== video.HAVE_ENOUGH_DATA) {
      rafRef.current = requestAnimationFrame(tick);
      return;
    }
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const code = decodeImageData(imageData);
    if (code) {
      setResult(code.data);
      stopCamera();
      return;
    }
    rafRef.current = requestAnimationFrame(tick);
  }

  return (
    <div className="flex max-w-sm flex-col gap-4">
      <div className="flex gap-2">
        <Button variant="outline" onClick={() => fileInputRef.current?.click()}>
          이미지 업로드
        </Button>
        {scanning ? (
          <Button variant="outline" onClick={stopCamera}>
            카메라 중지
          </Button>
        ) : (
          <Button variant="outline" onClick={startCamera}>
            카메라로 스캔
          </Button>
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
        }}
      />

      <video
        ref={videoRef}
        className={scanning ? "w-full rounded-lg" : "hidden"}
        muted
        playsInline
      />
      <canvas ref={canvasRef} className="hidden" />

      {error && <p className="text-sm text-destructive">{error}</p>}

      {result && (
        <Card>
          <CardContent className="break-all text-sm">
            <span className="text-xs text-muted-foreground">결과</span>
            <p>{result}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
