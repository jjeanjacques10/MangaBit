import { IInvestigador } from "@intersScrap/IInvestigador";
import {ICrimeArea} from '@intersScrap/ICrimeArea'
import puppetter, { Page } from 'puppeteer'
import { Browser } from "puppeteer";

export class Investigador implements IInvestigador {
   private crimeArea:ICrimeArea;
   private place?:Page; 
   private browser?:Browser;

    constructor(crimeArea:ICrimeArea){
      this.crimeArea = crimeArea;
    }
    getCrimeArea(): ICrimeArea {
        return this.crimeArea;
    }
    setBrowser(browser: Browser): void {
        this.browser = browser;
    }
    getBrowser(): Browser | undefined {
        return this.browser;
    }
    async investigate(): Promise<any> {
        this.setBrowser(await puppetter.launch({args:['--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--single-process'],headless: true}/* {headless:false,args:['--start-maximized']} */))
        const page = await this.getBrowser().newPage()
        await page.goto(this.getCrimeArea().getWebSite())
        this.setPlace(page)
    }
    

    getPlace(): Page | undefined {
        return this.place;
    }

    setPlace(place: Page): void {
        this.place = place;
    }
    async leavePlace(): Promise<any> {
         await this.place?.close()
         
    }
    async closeBrowser(): Promise<any> {
        await this.getBrowser()?.close()
    }

}