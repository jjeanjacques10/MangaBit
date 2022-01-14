import { PageService } from "@servicesDB/PageService"; 
import { Request, Response } from "express";

import {ScrapRotineService} from '../services/ScrapRotineService'
import {ChapterService }from '@servicesDB/ChapterService'
const chapterService = new ChapterService()
const scrapRotineService=new ScrapRotineService()
const pageService = new PageService();
export class PageController{

    async list(req:Request,res:Response){
        const {mangaId,chapterId} =req.params
        
        const pages=await pageService.find({
            where:{chapterId},
            orderBy:{
                page_number:'asc'
            }
        })

        const chapters=await chapterService.find({where:{}})
        console.log(chapters)
        if(pages.length===0){
            
            scrapRotineService.populatePagesByChapter(chapters[0])
            return res.status(200).json({data:[],total_pages:0,status:chapters[0].status})
        }else{
            return res.json({data:pages,total_pages:pages.length,status:chapters[0].status})
        }
    }
}