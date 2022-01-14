import { sleep } from "@tools/sleep";
import { AnalyzeManga } from "../scrap/AnalyzeManga";
import { CrimeArea } from "../scrap/CrimeArea";
import { Investigador } from "../scrap/Investigador";
import {AnalyzeCapitulo} from '../scrap/AnalyzeCapitulo'
import { AnalyzeTotalPagesCapitulo } from "../scrap/AnalyzeTotalPagesCapitulo";
import { AnalyzePage } from "../scrap/AnalyzePage";
export class MangaOnline{

    async  searchManga(manga: string,page:number):Promise<any> {

        const crimeArea = new CrimeArea(manga, 'https://mangalivre.net/lista-de-mangas/ordenar-por-nome/'+(manga.toLocaleLowerCase())[0]+'?page='+page,'');
        const investigador = new Investigador(crimeArea);
        await investigador.investigate()
        const analyzeManga = new AnalyzeManga(investigador);
        const links=await analyzeManga.process()
        await investigador.leavePlace()
        await investigador.closeBrowser()
        
        let manganameFormat = (manga.toLowerCase()).replace(/\s/g, '-');
        manganameFormat = manganameFormat.replace(/\:/g, '');
        console.log(manganameFormat)
        for(let link of links.linksHref){
            if(link.split('/')[4]==manganameFormat){
                return link
            }
        
        }
     
        
        if(links.linksHref.length>0){
                
                return {
                    prox:page+1
                    
                }  
        }
        }
    async getCapitulos(url:string):Promise<any>{

        const crimeArea = new CrimeArea('',url,'');
        const investigador = new Investigador(crimeArea);
        await investigador.investigate()
        
        const analyzeCapitulo = new AnalyzeCapitulo(investigador);
        const capitulos=await analyzeCapitulo.process()

        await investigador.leavePlace()
        await investigador.closeBrowser()
        return capitulos
    }    
    
    async getNumberPages(url:string):Promise<any>{
        const crimeArea = new CrimeArea('',url,'');
        const investigador = new Investigador(crimeArea);
        await investigador.investigate()

        const analyzeTotalPages=new AnalyzeTotalPagesCapitulo(investigador)

        const pages=await analyzeTotalPages.process()
     
        await investigador.leavePlace()
        await investigador.closeBrowser()
        return pages
        
    }


    async getPage(url:string,page:number):Promise<any>{
        const crimeArea = new CrimeArea('',url+'#/!page'+page,'');
        const investigador = new Investigador(crimeArea);
        await investigador.investigate()

       const analyzePage = new AnalyzePage(investigador)
       const pageResult=await analyzePage.process()
        await investigador.leavePlace()
        await investigador.closeBrowser()
        return pageResult
    }
}