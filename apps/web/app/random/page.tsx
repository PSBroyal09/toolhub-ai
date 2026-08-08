"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { RandomNumber } from "@/components/random-tools/random-number";
import { RandomDraw } from "@/components/random-tools/random-draw";
import { RandomPassword } from "@/components/random-tools/random-password";
import { RandomNickname } from "@/components/random-tools/random-nickname";

const TABS = [
  { value: "number", label: "랜덤 번호", component: <RandomNumber /> },
  { value: "draw", label: "랜덤 추첨", component: <RandomDraw /> },
  { value: "password", label: "랜덤 비밀번호", component: <RandomPassword /> },
  { value: "nickname", label: "랜덤 닉네임", component: <RandomNickname /> },
];

export default function RandomPage() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold">랜덤 도구</h1>

      <Tabs defaultValue="number">
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
