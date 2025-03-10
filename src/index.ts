import express from 'express';
import mongoose from 'mongoose';
import router from './routes';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 3000;


const app = express();
app.use(express.json());

app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"], 
    credentials: true
}));

const MONGO_URL = process.env.MONGO_URI as string;

mongoose.connect(MONGO_URL, {
    dbName: 'twa'
}).then(() => {
    console.log('Connected to database');
}).catch((err) => {
    console.error(err);
});

app.use("/", router)


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})