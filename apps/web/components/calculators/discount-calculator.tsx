"use client";

import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";

export function DiscountCalculator() {
  const [price, setPrice] = useState("");
  const [rate, setRate] = useState("");

  const result = useMemo(() => {
    const p = parseFloat(price);
    const r = parseFloat(rate);
    if (!p || p < 0 || isNaN(r) || r < 0) return null;
    const discountAmount = (p * r) / 100;
    const finalPrice = p - discountAmount;
    return { discountAmount, finalPrice };
  }, [price, rate]);

  return (
    <div className="flex max-w-sm flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="price">정가 (원)</Label>
        <Input
          id="price"
          type="number"
          inputMode="decimal"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="50000"
        />
      </div>
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="rate">할인율 (%)</Label>
        <Input
          id="rate"
          type="number"
          inputMode="decimal"
          value={rate}
          onChange={(e) => setRate(e.target.value)}
          placeholder="20"
        />
      </div>

      {result && (
        <Card>
          <CardContent className="flex flex-col gap-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">할인 금액</span>
              <span className="font-medium">
                {Math.round(result.discountAmount).toLocaleString()}원
              </span>
            </div>
            <div className="flex justify-between text-lg font-semibold">
              <span>최종 가격</span>
              <span>{Math.round(result.finalPrice).toLocaleString()}원</span>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
