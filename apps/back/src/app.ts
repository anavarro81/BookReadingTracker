import express from 'express'
import cors from 'cors'
import {errorHandler} from "./middleware/error.middleware"
import helmet from 'helmet'

const app = express()
app.use(cors()) 
app.use(express.json())
app.use(helmet())

app.get('/health', (req, res) => {
    res.status(200).json({status: "OK"})
})

app.use(errorHandler)

export default app