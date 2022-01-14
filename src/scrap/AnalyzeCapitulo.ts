import { IAnalyze } from "@intersScrap/IAnalyze";
import { IInvestigador } from "@intersScrap/IInvestigador";
import { Console } from "console";

export class AnalyzeCapitulo implements IAnalyze{
    private investigador:IInvestigador;
    constructor(investigador:IInvestigador){
        this.investigador=investigador;
    }
    getInvestigador(): IInvestigador {
        return this.investigador
    }
    async process(): Promise<any> {
        console.log("Entrou aqui")
        return await this.getInvestigador().getPlace()?.evaluate(async ()=>{
            function sleep(ms) {
                return new Promise(resolve => setTimeout(resolve, ms*1000));
            }
            async function scrollFull(){

                var heightPage = document.body.scrollHeight;
                let controller=true
                let heigthPageAnt;
                while (controller){
                
                window.scrollTo(0 , document.body.scrollHeight);
                await sleep(4)
                let newScroll=document.body.scrollHeight;
                
                
                console.log(heightPage==newScroll)
                console.log(heightPage)
                console.log(newScroll)
                if(heightPage==newScroll){
                controller=false
                }else{
                heightPage=newScroll
                }
                window.scrollTo(0 , heightPage);
                }
                }

              return await scrollFull() .then(()=>{
                const caps=document.querySelector('ul.full-chapters-list')
                let captsMonteds:any =[]
    
                
               
                for(let cap of caps.children){
                    let chapter;
                    try{
                            chapter={
                            capNumber:(cap.children[cap.children.length==3?1:0].children[1].children[0].children[0].innerText).split(' ')[1],
                            url:cap.children[cap.children.length==3?1:0].href,
                            title:cap.children[cap.children.length==3?1:0].children[1].children[0].children[1].innerText, 
                            releaseDate:cap.children[cap.children.length==3?1:0].children[0].innerText
                                }
                    }catch(error){
    
                            chapter={
                            capNumber:(cap.children[0].children[1].children[0].children[0].innerText).split(' ')[1],
                            url:cap.children[0].href,
                            title:cap.children[0].children[1].children[0].children[1].innerText, 
                            releaseDate:cap.children[0].children[0].innerText
                                }
                    }
                    
                    captsMonteds.push(chapter)
                  
                    
                }

                return captsMonteds
              })
            
            
        })
    }
}