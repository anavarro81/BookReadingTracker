import app from './app'
import env from './config/env'
import connectDB from './config/bd'


async function main () {

    try {
        await connectDB()
        app.listen(env.PORT, () => {
        console.log(`Server running on PORT: ${env.PORT}`)
    })


    } catch (error) {
        console.error('Failed to start server:', error)
        process.exit(1)   
    }

}


main()

