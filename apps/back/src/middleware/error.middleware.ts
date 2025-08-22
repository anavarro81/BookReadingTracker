import { Request, Response, NextFunction } from "express";
import {AppError} from '../errors/AppError'

type ErrorResponse = {
    message: string;
    status: number, 
    type: string
}

export const errorHandler = (error: any, req: Request, res: Response, next: NextFunction) => {

    let errorMessage: ErrorResponse = {
        message: "Internal Server Error",
        status: 500, 
        type: "ServerError"
    }
    
    if (error instanceof AppError) {
        
        errorMessage.message = error.message
        errorMessage.status = error.status || 500
        errorMessage.type = error.name || "AppError"        

    } else if (error instanceof Error) {
        errorMessage.message = error.message;
        errorMessage.type = error.name || errorMessage.type;
        console.error(error); // log for debugging

    } else {
        console.error('Unknown error ', error)
    }

    res.status(errorMessage.status).json({error: errorMessage})

}
