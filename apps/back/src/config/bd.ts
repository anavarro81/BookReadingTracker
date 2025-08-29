import mongoose from "mongoose";
import env from './env'


const connectDB = async () => {

    if (!env.DATABASE_URL || !env.DATABASE_URL.trim()) {
       console.error('URL de conexion a la base de datos no valida') 
       throw new Error('URL de conexion no definida');
    }

    try {
        
        const {connection} = await mongoose.connect(env.DATABASE_URL)
        const dbName = connection.name || connection.db?.databaseName || "unknown"
        const host = connection.host ||  "unknown"
        const port = connection.port ||  "-"
        console.log(`Conexión correcta a la base de datos: ${dbName} @ ${host}:${port}`)
    
    } catch (error) {
        console.error('Error al conectar a la base de datos ', error)
        throw error
    }
}

export default connectDB

