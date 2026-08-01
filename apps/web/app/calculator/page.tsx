"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { GeneralCalculator } from "@/components/calculators/general-calculator";
import { BmiCalculator } from "@/components/calculators/bmi-calculator";
import { DiscountCalculator } from "@/components/calculators/discount-calculator";
import { PercentCalculator } from "@/components/calculators/percent-calculator";
import { DateCalculator } from "@/components/calculators/date-calculator";
import { AgeCalculator } from "@/components/calculators/age-calculator";

const TABS = [
  { value: "general", label: "일반", component: <GeneralCalculator /> },
  { value: "bmi", label: "BMI", component: <BmiCalculator /> },
  { value: "discount", label: "할인", component: <DiscountCalculator /> },
  { value: "percent", label: "퍼센트", component: <PercentCalculator /> },
  { value: "date", label: "날짜", component: <DateCalculator /> },
  { value: "age", label: "나이", component: <AgeCalculator /> },
];

export default function CalculatorPage() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold">계산기</h1>

      <Tabs defaultValue="general">
        <TabsList>
          {TABS.map((tab) => (
            <TabsTrigger key={tab.value} value={tab.value}>
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
        {TABS.map((tab) => (
          <TabsContent key={tab.value} value={tab.value} className="pt-4">
            {tab.component}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
