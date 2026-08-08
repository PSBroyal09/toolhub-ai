"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { JsonFormatter } from "@/components/dev-tools/json-formatter";
import { UuidGenerator } from "@/components/dev-tools/uuid-generator";
import { Base64Tool } from "@/components/dev-tools/base64-tool";
import { UrlEncodeTool } from "@/components/dev-tools/url-encode-tool";
import { HashGenerator } from "@/components/dev-tools/hash-generator";
import { JwtDecoder } from "@/components/dev-tools/jwt-decoder";

const TABS = [
  { value: "json", label: "JSON", component: <JsonFormatter /> },
  { value: "uuid", label: "UUID", component: <UuidGenerator /> },
  { value: "base64", label: "Base64", component: <Base64Tool /> },
  { value: "url", label: "URL", component: <UrlEncodeTool /> },
  { value: "hash", label: "Hash", component: <HashGenerator /> },
  { value: "jwt", label: "JWT", component: <JwtDecoder /> },
];

export default function DevPage() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold">개발자 도구</h1>

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
