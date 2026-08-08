"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ImageCompressor } from "@/components/file-tools/image-compressor";
import { ImageConverter } from "@/components/file-tools/image-converter";
import { PdfMerge } from "@/components/file-tools/pdf-merge";
import { PdfSplit } from "@/components/file-tools/pdf-split";

const TABS = [
  { value: "compress", label: "이미지 압축", component: <ImageCompressor /> },
  { value: "convert", label: "PNG/JPG/WebP 변환", component: <ImageConverter /> },
  { value: "merge", label: "PDF 합치기", component: <PdfMerge /> },
  { value: "split", label: "PDF 페이지 추출", component: <PdfSplit /> },
];

export default function FilesPage() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold">파일 도구</h1>

      <Tabs defaultValue="compress">
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
