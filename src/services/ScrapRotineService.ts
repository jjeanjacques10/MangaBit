import { ScrapService } from "@servicesDB/ScrapService";
import { PageService } from "@servicesDB/PageService";
import { ChapterService } from "@servicesDB/ChapterService";
import { MangaOnline } from "../MangaOnline/MangaOnline";
import { sleep } from "@tools/sleep";
import { Chapter } from "@prisma/client";
const pageService = new PageService();
const chapterService = new ChapterService();
const scrapService = new ScrapService();
const mangaOnline = new MangaOnline();
export class ScrapRotineService{
    
    async run(){
        this.poplulateCapitulos()
       /*  this.populatePages() */
      
        }

    async poplulateCapitulos(){
       try {
        while(true){
            const scraps = await scrapService.find({
                orderBy:{
                    'date':'asc'
                },
                take:10
            })

            for(let scrap of scraps){
               let page=1;
               let controller=true;
               let mangaUrl;
               console.log('Scrap: ',scrap.id,scrap.title)
               while(controller){ 
                 
                const searhResult= (await mangaOnline.searchManga(scrap.title,page))
                if(typeof searhResult =='object'){
                    page=searhResult.prox
                }else {
                       controller=false;
                       mangaUrl=searhResult
                }
                console.log("Page: ",page)
                await sleep(2)
             }
               const capitulos=await chapterService.find({
                     where:{id_manga:scrap.id},
               })
               console.log('capitulos baixados',capitulos.length)
               console.log(mangaUrl)
                const chapters=await mangaOnline.getCapitulos(mangaUrl)
                for(let i=chapters.length-1; i>0;i--){
                    console.log('Capitulo: ',chapters[i])
                    const index=capitulos.findIndex(c=>c.url==chapters[i].url)
                    if(index===-1){  
                     try {
                        await chapterService.create({
                            id_manga:scrap.id,
                            title:chapters[i].title?chapters[i].title:'',
                            url:chapters[i].url,
                            status:'Not Found',
                            releaseDate: chapters[i].releaseDate,
                            number:chapters[i].capNumber.toString(),
                            created_at:new Date(),
                        })
                     } catch (error:any) {
                         console.log(error.message)
                     }
                       
                    }
                }
 
               await scrapService.delete(scrap.id)
                }               
        }
       } catch (error:any) {
           console.log(error.message)
       }
    }

    async populatePages(){
        while(true){
            try {
                const chapters = await chapterService.find({
                    where:{OR:[{
                        status:'Not Found',
                    },
                    {
                        status:'Processing',
                    }
                ]  },
                    take:10,
                    orderBy:{
                       created_at:'asc'
                    }
                                    
                })
                for(let chapter of chapters){
                    await chapterService.update({id:chapter.id,status:'Processing'})
                    const pages=await pageService.find({
                        where:{chapterId:chapter.id},
                    })
                    const numberPages=await mangaOnline.getNumberPages(chapter.url)
                        console.log('NumberPages: ',numberPages)
                        for(let x=numberPages.inititalPage;x<numberPages.finalPage;x++){
                            await sleep(1)
                            const page=await mangaOnline.getPage(chapter.url,x)
                            console.log(page)
                           const index= pages.findIndex(p=>p.imageUrl===page.url)
                           if(index===-1){ 
                           await pageService.create({
                                chapterId:chapter.id,
                                page_number:x,
                                imageUrl:page.url
                                })
                            }
                        }
                    await chapterService.update({id:chapter.id,status:'Done'})
                            
                        }
            } catch (error:any) {
                console.log(error.message)
            }
           

                }
        }

    async populatePagesByChapter(chapter:Chapter){
        try{
        console.log("Inicio do processo por capitulo")
        if(chapter.status=='Not Found'){
        
        await chapterService.update({id:chapter.id,status:'Processing'})
        const pages=await pageService.find({
            where:{chapterId:chapter.id},
        })
        console.log("Pages local",pages.length)
        const numberPages=await mangaOnline.getNumberPages(chapter.url)
        console.log("Pages Encontrada",JSON.stringify(numberPages))
        for(let x=numberPages.inititalPage;x<numberPages.finalPage;x++){
            await sleep(1)
            const page=await mangaOnline.getPage(chapter.url,x)
            console.log(page)
           const index= pages.findIndex(p=>p.imageUrl===page.url)
           if(index===-1){ 
           await pageService.create({
                chapterId:chapter.id,
                page_number:x,
                imageUrl:page.url
                })
            }
        }
    await chapterService.update({id:chapter.id,status:'Done'})
    }
}catch(error:any){
    console.log(error.message)
}
    }
}