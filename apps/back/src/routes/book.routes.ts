import express from 'express'

import {
    newBook,
    deleteBook,
    updateProgress,
    updatebook
 } from '../controllers/book.controller'


 const bookRouter = express.Router();

 bookRouter.post('/', newBook)
 bookRouter.delete('/:id', deleteBook)
 bookRouter.put('/:id', updateProgress)

 export default bookRouter