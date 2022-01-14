import { IScrapService } from "@intersDB/IScrapService";
import { Prisma, Scrap } from "@prisma/client";
import { PrismaService } from "./PrismaService";

export class ScrapService extends PrismaService implements IScrapService{

    constructor() {
        super();
    }

    async find(options:Prisma.ScrapFindManyArgs):Promise<Scrap[]>{
        return await this.getPrisma().scrap.findMany(options);
    }
    async create(options: Scrap): Promise<Scrap> {
        return await this.getPrisma().scrap.create({ data: options });
    }
    async delete(id: number): Promise<any> {
        return await this.getPrisma().scrap.delete({ where: { id } });
    }
}