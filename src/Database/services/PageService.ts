import { IPageService } from "@intersDB/IPagesService";
import { Prisma, Pages } from "@prisma/client";
import { PrismaService } from "./PrismaService";

export class PageService extends PrismaService implements IPageService {


    async find(options: Prisma.PagesFindManyArgs): Promise<Pages[]> {
        return this.getPrisma().pages.findMany(options);
    }

    async create(options: Omit<Pages, "id">): Promise<Pages> {
        return await this.getPrisma().pages.create({ data: options });
    }

    async update(options: Partial<Pages>): Promise<Pages> {
        return await this.getPrisma().pages.update({ where: { id: options.id }, data: options });
    }

    async delete(id: string): Promise<Pages> {
        return await this.getPrisma().pages.delete({ where: { id } });
    }
}