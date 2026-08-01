"use client";

import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";

export function PercentCalculator() {
  // X의 Y%는 얼마인가
  const [baseA, setBaseA] = useState("");
  const [percentA, setPercentA] = useState("");
  const resultA = useMemo(() => {
    const b = parseFloat(baseA);
    const p = parseFloat(percentA);
    if (isNaN(b) || isNaN(p)) return null;
    return (b * p) / 100;
  }, [baseA, percentA]);

  // X는 Y의 몇 %인가
  const [partB, setPartB] = useState("");
  const [wholeB, setWholeB] = useState("");
  const resultB = useMemo(() => {
    const part = parseFloat(partB);
    const whole = parseFloat(wholeB);
    if (isNaN(part) || !whole) return null;
    return (part / whole) * 100;
  }, [partB, wholeB]);

  // X에서 Y%만큼 증감하면 얼마인가
  const [baseC, setBaseC] = useState("");
  const [percentC, setPercentC] = useState("");
  const resultC = useMemo(() => {
    const b = parseFloat(baseC);
    const p = parseFloat(percentC);
    if (isNaN(b) || isNaN(p)) return null;
    return b + (b * p) / 100;
  }, [baseC, percentC]);

  return (
    <div className="flex max-w-sm flex-col gap-6">
      <div className="flex flex-col gap-2">
        <p className="text-sm font-medium">X의 Y%는 얼마인가</p>
        <div className="flex items-center gap-2">
          <Input
            type="number"
            value={baseA}
            onChange={(e) => setBaseA(e.target.value)}
            placeholder="X"
          />
          <span className="text-sm text-muted-foreground">의</span>
          <Input
            type="number"
            value={percentA}
            onChange={(e) => setPercentA(e.target.value)}
            placeholder="Y"
          />
          <span className="text-sm text-muted-foreground">%</span>
        </div>
        {resultA !== null && (
          <Card>
            <CardContent className="text-lg font-semibold">
              {resultA.toLocaleString()}
            </CardContent>
          </Card>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-sm font-medium">X는 Y의 몇 %인가</p>
        <div className="flex items-center gap-2">
          <Input
            type="number"
            value={partB}
            onChange={(e) => setPartB(e.target.value)}
            placeholder="X"
          />
          <span className="text-sm text-muted-foreground">는</span>
          <Input
            type="number"
            value={wholeB}
            onChange={(e) => setWholeB(e.target.value)}
            placeholder="Y"
          />
          <span className="text-sm text-muted-foreground">의</span>
        </div>
        {resultB !== null && (
          <Card>
            <CardContent className="text-lg font-semibold">
              {resultB.toFixed(2)}%
            </CardContent>
          </Card>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-sm font-medium">
          X에서 Y%만큼 증감하면 얼마인가 (감소는 음수 입력)
        </p>
        <div className="flex items-center gap-2">
          <Input
            type="number"
            value={baseC}
            onChange={(e) => setBaseC(e.target.value)}
            placeholder="X"
          />
          <span className="text-sm text-muted-foreground">에서</span>
          <Input
            type="number"
            value={percentC}
            onChange={(e) => setPercentC(e.target.value)}
            placeholder="Y"
          />
          <span className="text-sm text-muted-foreground">%</span>
        </div>
        {resultC !== null && (
          <Card>
            <CardContent className="text-lg font-semibold">
              {resultC.toLocaleString()}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
