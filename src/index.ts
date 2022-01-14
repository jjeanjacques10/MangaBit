/* import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
 */
import { sleep } from '@tools/sleep'
import {MangaOnline} from './MangaOnline/MangaOnline'
const mangalivre = new MangaOnline()



/* async function run(){
    console.log("Rodando...")
   
    
    let controller=true;
    let page=1;
    let result;
    while(controller){ 
       const searhResult= await mangalivre.searchManga('One Punch Man',page)
       if(typeof searhResult =='object'){
           page=searhResult.prox
       }else {
              controller=false;
              result=searhResult
       }

    }
    console.log(result)
    if(result){
        const caps=await mangalivre.getCapitulos(result)
       console.log ("Caps: ",caps)
       const pages=await mangalivre.getNumberPages(caps[0].url)
    console.log(pages)
      for (let i=pages.inititalPage;i<pages.totalPages;i++){
        await sleep(1)
        console.log('Url: ',(await mangalivre.getPage(caps[0].url,i)).url)
    }

 
    }else{
        console.log("Não encontrado")
    }
    console.log("Finalizado!")
} 
run()  */
import {config} from 'dotenv'
config()
import {app} from './Server'
import {ScrapRotineService} from './services/ScrapRotineService'
const scrapRotineService=new ScrapRotineService()
scrapRotineService.run()
app.listen((process.env.PORT?process.env.PORT:3000),()=>{
    console.log("Server running on port "+(process.env.PORT?process.env.PORT:3000))
})