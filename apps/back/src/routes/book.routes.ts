    import express from 'express'

import {
    newBook,
    deleteBook,
    updateProgress,
    updatebook,
    getAllBooks
 } from '../controllers/book.controller'


 const bookRouter = express.Router();

 bookRouter.post('/', newBook)
 bookRouter.delete('/:id', deleteBook)
 bookRouter.put('/update-progress/:id', updateProgress)
 bookRouter.put('/:id', updatebook)
 bookRouter.get('/', getAllBooks)


 export default bookRouter