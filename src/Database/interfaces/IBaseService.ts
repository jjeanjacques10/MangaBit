export interface IBaseService {
    create(options:any):Promise<any>;
    update(options:any):Promise<any>;
    delete(id:string):Promise<any>;
    find(options:any):Promise<any>;
}