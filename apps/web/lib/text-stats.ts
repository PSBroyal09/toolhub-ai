export interface TextStats {
  charsWithSpaces: number;
  charsWithoutSpaces: number;
  words: number;
  lines: number;
  paragraphs: number;
  bytes: number;
  readingSeconds: number;
  speakingSeconds: number;
}

const READING_CHARS_PER_MINUTE = 500; // 한글 묵독 기준 분당 500자
const SPEAKING_CHARS_PER_MINUTE = 300; // 한글 낭독 기준 분당 300자

export function computeTextStats(text: string): TextStats {
  const charsWithSpaces = text.length;
  const charsWithoutSpaces = text.replace(/\s/g, "").length;
  const words = text.trim() === "" ? 0 : text.trim().split(/\s+/).length;
  const lines = text === "" ? 0 : text.split("\n").length;
  const paragraphs =
    text.trim() === ""
      ? 0
      : text
          .split(/\n\s*\n/)
          .map((p) => p.trim())
          .filter((p) => p !== "").length;
  const bytes = new TextEncoder().encode(text).length;
  const readingSeconds = Math.ceil(
    (charsWithoutSpaces / READING_CHARS_PER_MINUTE) * 60,
  );
  const speakingSeconds = Math.ceil(
    (charsWithoutSpaces / SPEAKING_CHARS_PER_MINUTE) * 60,
  );

  return {
    charsWithSpaces,
    charsWithoutSpaces,
    words,
    lines,
    paragraphs,
    bytes,
    readingSeconds,
    speakingSeconds,
  };
}

export function formatDuration(totalSeconds: number): string {
  if (totalSeconds <= 0) return "0초";
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  if (minutes === 0) return `${seconds}초`;
  if (seconds === 0) return `${minutes}분`;
  return `${minutes}분 ${seconds}초`;
}
