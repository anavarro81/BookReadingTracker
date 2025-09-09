import express from 'express'
import cors from 'cors'
import {errorHandler} from "./middleware/error.middleware"
import helmet from 'helmet'
import bookRouter from './routes/book.routes'

const app = express()
app.use(cors()) 
app.use(express.json())
app.use(helmet())

console.log('Estoy en mi app')

app.get('/health', (req, res) => {
    res.status(200).json({status: "OK"})
})

app.use('/book', bookRouter)

app.use(errorHandler)

export default app