import { Browser } from "puppeteer";
import { Page } from "puppeteer";
import { ICrimeArea } from "./ICrimeArea";

export interface IInvestigador{
    investigate():Promise<any>;
    getCrimeArea():ICrimeArea;
    setPlace(place:Page):void;
    getPlace():Page | undefined;
    closeBrowser():Promise<void>
    getBrowser():Browser | undefined;
    setBrowser(browser:Browser):void;
}