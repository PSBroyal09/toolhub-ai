import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const tools = [
  {
    id: 'text',
    category: '텍스트',
    title: '글자수 세기',
    description: '공백 포함/제외 글자수, 단어수, 읽는 시간 등을 계산합니다.',
  },
  {
    id: 'calculator',
    category: '계산기',
    title: '계산기',
    description: '일반/BMI/할인/퍼센트/날짜/나이 계산기 모음입니다.',
  },
  {
    id: 'dev',
    category: '개발자',
    title: '개발자 도구',
    description: 'JSON, UUID, Base64, URL, Hash, JWT 도구 모음입니다.',
  },
  {
    id: 'random',
    category: '랜덤',
    title: '랜덤 도구',
    description: '랜덤 번호, 추첨, 비밀번호, 닉네임 생성기입니다.',
  },
  {
    id: 'qr',
    category: 'QR',
    title: 'QR 도구',
    description: 'QR 코드를 생성하고 스캔합니다.',
  },
  {
    id: 'files',
    category: '파일',
    title: '파일 도구',
    description: '이미지 압축/변환, PDF 합치기/추출을 지원합니다.',
  },
];

async function main() {
  for (const tool of tools) {
    await prisma.tool.upsert({
      where: { id: tool.id },
      update: tool,
      create: tool,
    });
  }
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
