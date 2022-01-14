import { ICrimeArea } from "@intersScrap/ICrimeArea";

export class CrimeArea implements ICrimeArea {

    private manga:string;
    private webSite:string;
    private object:string;
    private clues:any[];

    constructor(manga:string,webSite:string,object:string){
        this.clues = [];
        this.manga = manga;
        this.webSite = webSite;
        this.object = object;
    }


    setManga(manga:string){
        this.manga = manga;
    }
    getManga():string{
        return this.manga;
    }

    setWebSite(webSite:string){
        this.webSite = webSite;
    }
    getWebSite():string{
        return this.webSite;
    }

    setObject(object:string){
        this.object
    }
    getObject():string{
        return this.object;
    }
    setClues(clues: any[]): void {
        this.clues = clues;
    }
    getClues(): any[] {
        return this.clues;
    }

}