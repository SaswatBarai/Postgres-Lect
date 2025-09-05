import express,{Application} from "express";
import {Client} from "pg"
const app:Application=express();

const port =3000;

const pgClient  = new Client("postgresql://neondb_owner:npg_lSW65RTdfLHe@ep-twilight-block-a138ilv2-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require")

try {
    await pgClient.connect();
    console.log("Connected to database");
} catch (error) {
    console.error("Failed to connect to database:", error);
    process.exit(1);
}

const connectDb = async () => {
    try {
        const res = await pgClient.query(
            `
            CREATE TABLE IF NOT EXISTS users(
            id SERIAL PRIMARY KEY,
            username VARCHAR(50) UNIQUE NOT NULL,
            email VARCHAR(250) UNIQUE NOT NULL,
            password VARCHAR(250) NOT NULL,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
            );
            ',
            CREATE TABLE IF NOT EXISTS addresses(
            id SERIAL PRIMARY KEY,
            user_id INTEGER NOT NULL,
            city VARCHAR(100) NOT NULL,
            country VARCHAR(100) NOT NULL,
            street VARCHAR(250) NOT NULL,
            pincode VARCHAR(20) NOT NULL,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
            );
            `
        )
        console.log("Tables created successfully");
    } catch (error) {
        console.error("Error creating tables:", error);
    }
}

connectDb();
