export function parsePageRange(input: string, pageCount: number): number[] {
  const indices = new Set<number>();
  const parts = input.split(",").map((p) => p.trim()).filter(Boolean);

  for (const part of parts) {
    const rangeMatch = part.match(/^(\d+)-(\d+)$/);
    if (rangeMatch) {
      const start = parseInt(rangeMatch[1], 10);
      const end = parseInt(rangeMatch[2], 10);
      for (let i = start; i <= end; i++) {
        if (i >= 1 && i <= pageCount) indices.add(i - 1);
      }
      continue;
    }
    const single = parseInt(part, 10);
    if (!isNaN(single) && single >= 1 && single <= pageCount) {
      indices.add(single - 1);
    }
  }

  return Array.from(indices).sort((a, b) => a - b);
}
