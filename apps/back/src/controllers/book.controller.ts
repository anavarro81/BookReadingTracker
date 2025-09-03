import {Response, Request, NextFunction} from "express"
import {validateNewBook, validateUpdateBook} from '../utils/validators'

import * as bookService from '../services/book.service'

export const newBook = async (req: Request, res: Response, next:NextFunction):Promise<void> => {

    const result = validateNewBook(req.body)    

    if (!result.valid) {
        res.status(403).json({error: result.errors})
    }
    
    try {
        
        const book = await bookService.newBook(req.body)

        res.status(200).json({book})

        } catch (error) {
        next(error)
        
    }

}

export const deleteBook = async (req: Request, res: Response, next:NextFunction):Promise<void> => {

    try {

        const deletedBook = await bookService.deleteBook(req.params.id)

        res.status(200).json({deletedBook})

        
    } catch (error) {
        next(error)
        
    }

}

export  const updateProgress = async (req: Request, res: Response, next:NextFunction):Promise<void> => { 

    const {currentPage, totalPages} = req.body

    const {id} = req.params
    
    try {

        const updatedBook = await bookService.updateProgress(id, totalPages, currentPage)

        console.log('updatedBook ', updatedBook)

        res.status(200).json({updatedBook})
        
    } catch (error) {
        next(error)
    }
}

export  const updatebook = async (req: Request, res: Response,  next:NextFunction):Promise<void> => {    
    
    const {id} = req.params
    const data = req.body

    const result = validateUpdateBook(data)

    if (!result.valid) {
        res.status(403).json({error: result.errors})
    }

   
    
    try {
        
        const updatedBook = await bookService.updateBook(id, data)        

        res.status(200).json({updatedBook})

    } catch (error) {
       next(error) 
    }

}

export const getAllBooks = async (req: Request, res: Response,  next:NextFunction):Promise<void> => {

    try {
        const books = await bookService.getAllBooks()
        res.status(200).json({books})        
    } catch (error) {
        next(error)
    }

}
