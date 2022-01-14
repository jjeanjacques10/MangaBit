import { Chapter, Prisma } from "@prisma/client";
import { IBaseService } from "./IBaseService";

export interface IChapterService extends IBaseService {
    create(options:Omit<Chapter,'id'>):Promise<Chapter>;
    update(options:Partial<Chapter>):Promise<Chapter>;
   
    find(options:Prisma.ChapterFindManyArgs):Promise<Chapter[]>;
    delete(id:string):Promise<Chapter>;
    count(options:Prisma.ChapterCountArgs):Promise<number>;
}
