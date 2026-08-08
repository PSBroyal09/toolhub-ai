"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { QrGenerator } from "@/components/qr-tools/qr-generator";
import { QrScanner } from "@/components/qr-tools/qr-scanner";

const TABS = [
  { value: "generate", label: "QR 생성", component: <QrGenerator /> },
  { value: "scan", label: "QR 스캔", component: <QrScanner /> },
];

export default function QrPage() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold">QR 도구</h1>

      <Tabs defaultValue="generate">
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
