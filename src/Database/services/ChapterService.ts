import { IChapterService } from "@intersDB/IChapterService";
import { Chapter, Prisma } from "@prisma/client";
import { PrismaService } from "./PrismaService";

export class ChapterService extends PrismaService implements IChapterService {
    
    async find(options: Prisma.ChapterFindManyArgs): Promise<Chapter[]> {
        return await this.getPrisma().chapter.findMany(options);
    }

    async create(options: Omit<Chapter, "id">): Promise<Chapter> {
        return await this.getPrisma().chapter.create({ data: options });
    }

    async update(options: Partial<Chapter>):Promise<Chapter> {
        return await this.getPrisma().chapter.update({ where:{id:options.id},data: options });
    }

    async delete(id: string): Promise<Chapter> {
        return await this.getPrisma().chapter.delete({ where: { id } });
    }

    async count(options: Prisma.ChapterCountArgs): Promise<number> {
        return await this.getPrisma().chapter.count(options);
    }
}