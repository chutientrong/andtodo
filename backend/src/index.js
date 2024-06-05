import express from "express";
import dotenv from 'dotenv'
import cors from "cors";
import useragent from'express-useragent';
import connect from "./config/database.js";
import routes from "./routes/root.js";

dotenv.config()

await connect()

const PORT = process.env.SERVER_PORT || 4000
const origin = process.env.CORS_ORIGIN || 'http://47.237.5.1:3000'

const app = express()

app.use(cors({
    origin
}));
app.use(useragent.express());
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(express.json({ limit: '50mb' }));

routes(app)

app.listen(PORT, () => {
    console.log(`Your app is running in http://localhost:${PORT}`)
})