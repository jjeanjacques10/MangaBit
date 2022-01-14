import { Pages, Prisma } from "@prisma/client";
import { IBaseService } from "./IBaseService";

export interface IPageService extends IBaseService {
    create(options:Omit<Pages,'id'>):Promise<Pages>;
    update(options:Partial<Pages>):Promise<Pages>;
    find(options:Prisma.PagesFindManyArgs):Promise<Pages[]>;
    delete(id:string):Promise<Pages>;
    count(options:Prisma.PagesCountArgs):Promise<number>;
}