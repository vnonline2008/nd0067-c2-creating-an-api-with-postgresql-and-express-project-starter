import { Pool } from "pg";
import dotenv from 'dotenv';
dotenv.config();

export const client = new Pool({
    host: process.env.HOST,
    database: process.env.NODE_ENV === 'test' ? process.env.POSTGRESS_DATABASE_TEST : process.env.POSTGRESS_DATABASE,
    user: process.env.POSTGRESS_USERNAME,
    password: process.env.POSTGRESS_PASSWORD,
})
