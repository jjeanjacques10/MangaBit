import { Request, Response } from "express"
import { ChapterService } from "@servicesDB/ChapterService"
import {ScrapService} from '@servicesDB/ScrapService'
const scrapService=new ScrapService()
const chapterService = new ChapterService()
export class ChapterController{
   
    async list(req:Request,res:Response){
        const {mangaId} =req.params
        const {page=0}=req.query
        
        const chapters=await chapterService.find({
            where:{id_manga:parseInt(mangaId)},
            orderBy:{
                created_at:'asc'
            },
            skip:parseInt(page)*10,
            take:20
        })

        if(chapters.length===0){
            return res.status(404).json({
                message:"Chapters not found"
            })
        }

        const total=await chapterService.count({
            where:{id_manga:parseInt(mangaId)}
        })
        return res.json({
            chapters:chapters,
            pages:Math.ceil(total/20)
        })
       
    }

    async scrap(req:Request,res:Response){
        const {id,title}=req.body
        
        const scraps=await scrapService.find({
            where:{id:id}
        })
        if(scraps.length===0){
            const scrap=await scrapService.create({
                id:id,
                title:title,
                date:new Date()
            })
            return res.status(201).json({
                message:'Queued for scrap'
            })
        }else{
            return res.status(409).json({
                message:'already in line'

            })
        }
    }
}