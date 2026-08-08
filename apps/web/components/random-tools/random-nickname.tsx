"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const ADJECTIVES = [
  "용감한", "행복한", "졸린", "배고픈", "차분한", "신비한", "부지런한",
  "느긋한", "똑똑한", "엉뚱한", "귀여운", "든든한", "재빠른", "포근한",
  "씩씩한", "수줍은", "당당한", "상냥한", "유쾌한", "고요한",
];

const NOUNS = [
  "호랑이", "고양이", "강아지", "판다", "여우", "부엉이", "고래",
  "다람쥐", "펭귄", "토끼", "코끼리", "수달", "너구리", "사자",
  "곰돌이", "돌고래", "햄스터", "앵무새", "물개", "기린",
];

function generateNickname() {
  const adj = ADJECTIVES[Math.floor(Math.random() * ADJECTIVES.length)];
  const noun = NOUNS[Math.floor(Math.random() * NOUNS.length)];
  const num = Math.floor(Math.random() * 900) + 100;
  return `${adj}${noun}${num}`;
}

export function RandomNickname() {
  const [nicknames, setNicknames] = useState<string[]>([]);

  function generate() {
    setNicknames(Array.from({ length: 5 }, generateNickname));
  }

  return (
    <div className="flex max-w-sm flex-col gap-4">
      <Button onClick={generate} className="w-fit">
        생성
      </Button>

      {nicknames.length > 0 && (
        <Card>
          <CardContent className="flex flex-col gap-1 text-sm">
            {nicknames.map((n, i) => (
              <span key={i}>{n}</span>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
