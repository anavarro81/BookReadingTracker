import app from './app'
import env from './config/env'
import connectDB from './config/bd'




try {
    connectDB()
} catch (error) {    
    process.exit(1)
}


app.listen(env.PORT, () => {
    console.log(`Server running on PORT: ${env.PORT}`)
})

