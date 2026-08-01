import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateFavoriteDto } from './dto/create-favorite.dto';

@Injectable()
export class FavoritesService {
  constructor(private readonly prisma: PrismaService) {}

  findAllForUser(userId: string) {
    return this.prisma.favorite.findMany({
      where: { userId },
      include: { tool: true },
    });
  }

  async create(userId: string, dto: CreateFavoriteDto) {
    const existing = await this.prisma.favorite.findUnique({
      where: { userId_toolId: { userId, toolId: dto.toolId } },
    });
    if (existing) {
      throw new ConflictException('이미 즐겨찾기한 도구입니다.');
    }
    return this.prisma.favorite.create({
      data: { userId, toolId: dto.toolId },
    });
  }

  async remove(userId: string, favoriteId: string) {
    const favorite = await this.prisma.favorite.findUnique({
      where: { id: favoriteId },
    });
    if (!favorite) {
      throw new NotFoundException('즐겨찾기를 찾을 수 없습니다.');
    }
    if (favorite.userId !== userId) {
      throw new ForbiddenException();
    }
    await this.prisma.favorite.delete({ where: { id: favoriteId } });
    return { success: true };
  }
}
