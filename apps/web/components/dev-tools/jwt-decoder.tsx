"use client";

import { useMemo, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { base64UrlToUtf8 } from "@/lib/encoding";

export function JwtDecoder() {
  const [token, setToken] = useState("");

  const result = useMemo(() => {
    if (!token.trim()) return null;
    const parts = token.trim().split(".");
    if (parts.length !== 3) {
      return { error: "JWT 형식이 아닙니다. (header.payload.signature)" };
    }
    try {
      const header = JSON.parse(base64UrlToUtf8(parts[0]));
      const payload = JSON.parse(base64UrlToUtf8(parts[1]));
      return { header, payload };
    } catch {
      return { error: "토큰을 디코딩할 수 없습니다." };
    }
  }, [token]);

  return (
    <div className="flex flex-col gap-3">
      <Textarea
        value={token}
        onChange={(e) => setToken(e.target.value)}
        placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...."
        className="min-h-[120px] font-mono text-sm"
      />
      <p className="text-xs text-muted-foreground">
        서명 검증 없이 header/payload만 디코딩합니다.
      </p>

      {result?.error && (
        <p className="text-sm text-destructive">{result.error}</p>
      )}

      {result && !result.error && (
        <div className="grid gap-3 sm:grid-cols-2">
          <Card>
            <CardContent className="flex flex-col gap-2">
              <span className="text-xs text-muted-foreground">HEADER</span>
              <pre className="overflow-x-auto text-xs">
                {JSON.stringify(result.header, null, 2)}
              </pre>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex flex-col gap-2">
              <span className="text-xs text-muted-foreground">PAYLOAD</span>
              <pre className="overflow-x-auto text-xs">
                {JSON.stringify(result.payload, null, 2)}
              </pre>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
