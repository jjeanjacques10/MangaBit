import 'express-async-errors'
import express, { NextFunction, Request, Response } from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import v1 from './routes/v1.router'
const app: express.Application = express()

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/api/v1', v1)
app.use((error:Error,request:Request,response:Response, nextFunction:NextFunction)=>{
    return response.status(500).json({
        message:error.message
    })
})
export { app }

