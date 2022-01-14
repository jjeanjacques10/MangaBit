import { IAnalyze } from "@intersScrap/IAnalyze";
import { IInvestigador } from "@intersScrap/IInvestigador";

export class AnalyzeTotalPagesCapitulo implements IAnalyze {
    private investigador: IInvestigador;
    constructor(investigador: IInvestigador) {
        this.investigador = investigador;
    }
    getInvestigador(): IInvestigador {
        return this.investigador
    }
    async process(): Promise<any> {
        return this.getInvestigador().getPlace()?.evaluate(() => {
            const nav=document.querySelector('.page-navigation')
            const navTexts= nav.children[0].innerText.split(' ')


            return {
                totalPages:parseInt(navTexts[3]),
                inititalPage:0,
                finalPage:(parseInt(navTexts[3])-1)
            }
        })
    }
}