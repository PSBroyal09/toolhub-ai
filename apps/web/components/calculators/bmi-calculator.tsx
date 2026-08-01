"use client";

import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";

function classifyBmi(bmi: number): string {
  if (bmi < 18.5) return "저체중";
  if (bmi < 23) return "정상";
  if (bmi < 25) return "과체중";
  return "비만";
}

export function BmiCalculator() {
  const [heightCm, setHeightCm] = useState("");
  const [weightKg, setWeightKg] = useState("");

  const result = useMemo(() => {
    const h = parseFloat(heightCm);
    const w = parseFloat(weightKg);
    if (!h || !w || h <= 0 || w <= 0) return null;
    const heightM = h / 100;
    const bmi = w / (heightM * heightM);
    return { bmi, category: classifyBmi(bmi) };
  }, [heightCm, weightKg]);

  return (
    <div className="flex max-w-sm flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="height">키 (cm)</Label>
        <Input
          id="height"
          type="number"
          inputMode="decimal"
          value={heightCm}
          onChange={(e) => setHeightCm(e.target.value)}
          placeholder="170"
        />
      </div>
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="weight">몸무게 (kg)</Label>
        <Input
          id="weight"
          type="number"
          inputMode="decimal"
          value={weightKg}
          onChange={(e) => setWeightKg(e.target.value)}
          placeholder="65"
        />
      </div>

      {result && (
        <Card>
          <CardContent className="flex flex-col gap-1">
            <span className="text-xs text-muted-foreground">BMI 지수</span>
            <span className="text-2xl font-semibold">
              {result.bmi.toFixed(1)}{" "}
              <span className="text-base font-normal text-muted-foreground">
                ({result.category})
              </span>
            </span>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
