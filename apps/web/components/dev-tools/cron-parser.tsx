"use client";

import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const WEEKDAY_NAMES = ["일", "월", "화", "수", "목", "금", "토"];

const PRESETS = [
  { label: "매분", expr: "* * * * *" },
  { label: "매시 정각", expr: "0 * * * *" },
  { label: "매일 자정", expr: "0 0 * * *" },
  { label: "평일 오전 9시", expr: "0 9 * * 1-5" },
  { label: "매주 일요일 자정", expr: "0 0 * * 0" },
];

type Field =
  | { kind: "every" }
  | { kind: "step"; step: number }
  | { kind: "list"; values: number[] };

function parseField(raw: string, max: number): Field | null {
  if (raw === "*") return { kind: "every" };
  if (/^\*\/\d+$/.test(raw)) {
    return { kind: "step", step: Number(raw.slice(2)) };
  }
  const values = new Set<number>();
  for (const part of raw.split(",")) {
    const rangeStepMatch = part.match(/^(\d+)-(\d+)\/(\d+)$/);
    const rangeMatch = part.match(/^(\d+)-(\d+)$/);
    const singleMatch = part.match(/^\d+$/);
    if (rangeStepMatch) {
      const [, a, b, step] = rangeStepMatch.map(Number) as unknown as number[];
      for (let v = a; v <= b; v += step) values.add(v);
    } else if (rangeMatch) {
      const [, a, b] = rangeMatch.map(Number) as unknown as number[];
      for (let v = a; v <= b; v++) values.add(v);
    } else if (singleMatch) {
      values.add(Number(part));
    } else {
      return null;
    }
  }
  if (values.size === 0) return null;
  for (const v of values) if (v > max) return null;
  return { kind: "list", values: Array.from(values).sort((a, b) => a - b) };
}

function describeUnit(field: Field, unit: string, format: (v: number) => string = (v) => `${v}${unit}`) {
  if (field.kind === "every") return `매${unit}`;
  if (field.kind === "step") return `${field.step}${unit}마다`;
  return field.values.map(format).join(", ");
}

function describeCron(minute: Field, hour: Field, day: Field, month: Field, dow: Field) {
  let timePart: string;
  if (minute.kind === "list" && hour.kind === "list") {
    const times = hour.values.flatMap((h) =>
      minute.values.map((m) => `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`),
    );
    timePart = `${times.join(", ")}에`;
  } else if (minute.kind === "every" && hour.kind === "every") {
    timePart = "매분";
  } else {
    const hourText = describeUnit(hour, "시");
    const minuteText = describeUnit(minute, "분");
    timePart = `${hourText} ${minuteText}`.trim();
  }

  const dayParts: string[] = [];
  if (month.kind !== "every") dayParts.push(describeUnit(month, "월"));
  if (day.kind !== "every") dayParts.push(describeUnit(day, "일"));
  if (dow.kind !== "every") {
    dayParts.push(describeUnit(dow, "요일", (v) => `${WEEKDAY_NAMES[v % 7]}요일`));
  }
  const dayPart = dayParts.length ? dayParts.join(" ") : "매일";

  return `${dayPart} ${timePart} 실행`;
}

export function CronParser() {
  const [expr, setExpr] = useState("0 9 * * 1-5");

  const result = useMemo(() => {
    const fields = expr.trim().split(/\s+/);
    if (fields.length !== 5) {
      return { error: "cron 표현식은 5개 필드(분 시 일 월 요일)로 이루어져야 합니다." };
    }
    const [minRaw, hourRaw, dayRaw, monthRaw, dowRaw] = fields;
    const minute = parseField(minRaw, 59);
    const hour = parseField(hourRaw, 23);
    const day = parseField(dayRaw, 31);
    const month = parseField(monthRaw, 12);
    const dow = parseField(dowRaw, 7);
    if (!minute || !hour || !day || !month || !dow) {
      return { error: "필드 값을 해석할 수 없습니다." };
    }
    return { description: describeCron(minute, hour, day, month, dow) };
  }, [expr]);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="cron-input">cron 표현식 (분 시 일 월 요일)</Label>
        <Input
          id="cron-input"
          value={expr}
          onChange={(e) => setExpr(e.target.value)}
          placeholder="0 9 * * 1-5"
          className="font-mono"
        />
      </div>

      <div className="flex flex-wrap gap-2">
        {PRESETS.map((preset) => (
          <Button
            key={preset.expr}
            type="button"
            size="sm"
            variant="outline"
            onClick={() => setExpr(preset.expr)}
          >
            {preset.label}
          </Button>
        ))}
      </div>

      {result.error && <p className="text-sm text-destructive">{result.error}</p>}

      {result.description && (
        <Card>
          <CardContent className="text-sm">{result.description}</CardContent>
        </Card>
      )}
    </div>
  );
}
