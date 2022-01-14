import { IInvestigador } from "./IInvestigador";

export  interface IAnalyze{
    getInvestigador():IInvestigador;
    process():Promise<any>;
}