"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { PageHeader } from "@/components/page-header";
import { JsonFormatter } from "@/components/dev-tools/json-formatter";
import { UuidGenerator } from "@/components/dev-tools/uuid-generator";
import { Base64Tool } from "@/components/dev-tools/base64-tool";
import { UrlEncodeTool } from "@/components/dev-tools/url-encode-tool";
import { HashGenerator } from "@/components/dev-tools/hash-generator";
import { JwtDecoder } from "@/components/dev-tools/jwt-decoder";
import { TimestampConverter } from "@/components/dev-tools/timestamp-converter";
import { RegexTester } from "@/components/dev-tools/regex-tester";
import { TextDiff } from "@/components/dev-tools/text-diff";
import { CronParser } from "@/components/dev-tools/cron-parser";

const TABS = [
  { value: "json", label: "JSON", component: <JsonFormatter /> },
  { value: "uuid", label: "UUID", component: <UuidGenerator /> },
  { value: "base64", label: "Base64", component: <Base64Tool /> },
  { value: "url", label: "URL", component: <UrlEncodeTool /> },
  { value: "hash", label: "Hash", component: <HashGenerator /> },
  { value: "jwt", label: "JWT", component: <JwtDecoder /> },
  { value: "timestamp", label: "타임스탬프", component: <TimestampConverter /> },
  { value: "regex", label: "정규식", component: <RegexTester /> },
  { value: "diff", label: "Diff", component: <TextDiff /> },
  { value: "cron", label: "Cron", component: <CronParser /> },
];

export default function DevPage() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="개발자 도구"
        description="JSON, 해시, 정규식, cron까지 — 자주 쓰는 개발 유틸리티 모음입니다."
      />

      <Tabs defaultValue="json">
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
