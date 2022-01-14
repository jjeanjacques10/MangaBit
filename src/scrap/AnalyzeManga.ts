import { IAnalyze } from "@intersScrap/IAnalyze";
import { IInvestigador } from "@intersScrap/IInvestigador";

export class AnalyzeManga  implements IAnalyze{
    private investigador:IInvestigador;
    constructor(investigador:IInvestigador){
        this.investigador=investigador;
    }
    getInvestigador(): IInvestigador {
        return this.investigador
    }
    async process(): Promise<any> {
        return this.getInvestigador().getPlace()?.evaluate(()=>{
            const links = document.querySelectorAll('.link-block');
            let linksHref:any =[]
            for(let link of links){
                linksHref.push(link.href)
            }
            return {
                linksHref
            }
        })
    }
}