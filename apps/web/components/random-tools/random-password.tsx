"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const CHAR_SETS = {
  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  lowercase: "abcdefghijklmnopqrstuvwxyz",
  numbers: "0123456789",
  symbols: "!@#$%^&*()-_=+",
};

function generatePassword(length: number, sets: string[]) {
  const pool = sets.join("");
  if (pool === "") return "";
  const bytes = new Uint32Array(length);
  crypto.getRandomValues(bytes);
  return Array.from(bytes, (b) => pool[b % pool.length]).join("");
}

export function RandomPassword() {
  const [length, setLength] = useState("16");
  const [options, setOptions] = useState({
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: false,
  });
  const [password, setPassword] = useState("");

  function toggle(key: keyof typeof options) {
    setOptions((prev) => ({ ...prev, [key]: !prev[key] }));
  }

  function generate() {
    const sets = (Object.keys(options) as (keyof typeof options)[])
      .filter((key) => options[key])
      .map((key) => CHAR_SETS[key]);
    const len = Math.min(Math.max(parseInt(length, 10) || 8, 4), 128);
    setPassword(generatePassword(len, sets));
  }

  function copy() {
    navigator.clipboard?.writeText(password);
  }

  return (
    <div className="flex max-w-sm flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="pw-length">길이</Label>
        <Input
          id="pw-length"
          type="number"
          min={4}
          max={128}
          value={length}
          onChange={(e) => setLength(e.target.value)}
          className="w-24"
        />
      </div>

      <div className="flex flex-col gap-1.5 text-sm">
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={options.uppercase} onChange={() => toggle("uppercase")} />
          대문자 (A-Z)
        </label>
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={options.lowercase} onChange={() => toggle("lowercase")} />
          소문자 (a-z)
        </label>
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={options.numbers} onChange={() => toggle("numbers")} />
          숫자 (0-9)
        </label>
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={options.symbols} onChange={() => toggle("symbols")} />
          특수문자 (!@#$...)
        </label>
      </div>

      <Button onClick={generate} className="w-fit">
        생성
      </Button>

      {password && (
        <Card>
          <CardContent className="flex items-center justify-between gap-2">
            <span className="break-all font-mono text-sm">{password}</span>
            <Button variant="outline" size="sm" onClick={copy}>
              복사
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
