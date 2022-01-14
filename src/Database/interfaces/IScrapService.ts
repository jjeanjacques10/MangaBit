import {Prisma, Scrap} from '@prisma/client'
export interface IScrapService{
    create(options:Scrap):Promise<Scrap>;
    find(options:Prisma.ScrapFindManyArgs):Promise<Scrap[]>;
    delete(id:number):Promise<Scrap>;
}