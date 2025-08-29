import dotenv from 'dotenv';

interface Env {
    PORT: number;
    DATABASE_URL:string
}

// Obtener el nombre de archivo

const envFile  = process.env.NODE_ENV === 'production' 
    ? ".env.production" 
    : ".env" 

dotenv.config({path: envFile})

const env: Env = {
    PORT: parseInt(process.env.PORT || "3000", 10),
    DATABASE_URL: process.env.DATABASE_URL || ""
}

export default env

