import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AdminService {
  constructor(private readonly prisma: PrismaService) {}

  async getStats() {
    const [totalUsers, totalFavorites, tools, favoritesByTool, recentUsers] =
      await Promise.all([
        this.prisma.user.count(),
        this.prisma.favorite.count(),
        this.prisma.tool.findMany(),
        this.prisma.favorite.groupBy({
          by: ['toolId'],
          _count: { toolId: true },
        }),
        this.prisma.user.findMany({
          orderBy: { createdAt: 'desc' },
          take: 10,
          select: {
            id: true,
            nickname: true,
            email: true,
            role: true,
            createdAt: true,
          },
        }),
      ]);

    const toolTitleById = new Map(tools.map((t) => [t.id, t.title]));
    const toolUsage = favoritesByTool
      .map((row) => ({
        toolId: row.toolId,
        title: toolTitleById.get(row.toolId) ?? row.toolId,
        favoriteCount: row._count.toolId,
      }))
      .sort((a, b) => b.favoriteCount - a.favoriteCount);

    return {
      totalUsers,
      totalFavorites,
      totalTools: tools.length,
      toolUsage,
      recentUsers,
    };
  }
}
