import {Client} from "pg";
import express,{Application} from "express";

const app:Application = express();

const pgClient  = new Client("postgresql://neondb_owner:npg_lSW65RTdfLHe@ep-twilight-block-a138ilv2-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require")

// const pgCLient2 = new Client({
//     user: "neondb_owner",
//     host:"ep-twilight-block-a138ilv2-pooler.ap-southeast-1.aws.neon.tech",
//     port:5432,
//     password:"npg_lSW65RTdfLHe",
//     database:"neondb",
// })

await pgClient.connect();
const connectDb = async () => {
    // console.log("Connected to Postgres:",res);
    // const result = await pgClient.query(
    //     "Update users set username = 'Sawat' Where id =1"
    // );

    // const result = await pgClient.query(
    //     `
    //     CREATE TABLE todo(
    //     id SERIAL PRIMARY KEY,
    //     title VARCHAR(50),
    //     description VARCHAR(100),
    //     done BOOLEAN
    //     );
    //     `
    // )

    // console.log(result)
}


app.post("/signup",async (req,res) => {
    const {username, password,email} = req.body;
    // const SQLquery = `
    //     INSERT INTO users (username,email,password) VALUES
    //     ('${username}','${email}','${password}')`
    // const response = await pgClient.query(SQLquery)
    /*
    Above code is not the safest way to insert the data because user can 
    effect the data base so we will use different way 
    
    Attacker can attack by using the sql injection 
    */

    const insertQuery = `INSERT INTO users (username,email,password) VALUES
                         ($1,$2,$3)`

    const response = await pgClient.query(insertQuery,[username,email,password]);
    res.json({
        message:"Successfully created"
    })
})

app.listen(8000,async () => {
    await connectDb();
})