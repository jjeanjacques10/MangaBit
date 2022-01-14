import { IAnalyze } from "@intersScrap/IAnalyze";
import { IInvestigador } from "@intersScrap/IInvestigador";

export class AnalyzePage implements IAnalyze {
    private investigador: IInvestigador;
    constructor(investigador: IInvestigador) {
        this.investigador = investigador;
    }
    getInvestigador(): IInvestigador {
        return this.investigador
    }
    async process(): Promise<any> {
        return this.getInvestigador().getPlace()?.evaluate(() => {
            let mangaDiv=document.querySelector('.manga-image')
            return {
                url:mangaDiv.children[0].children[1].src
            }
        })
    }
}