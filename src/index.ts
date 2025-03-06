import express from 'express';
import mongoose from 'mongoose';
import router from './routes';
import cors from 'cors';

const dbStr = require('../db.ts').default;

const app = express();
app.use(express.json());

// CORS allows all urls
app.use(cors());

const MONGO_URL = dbStr;

mongoose.connect(MONGO_URL, {
    dbName: 'twa'
}).then(() => {
    console.log('Connected to database');
}).catch((err) => {
    console.error(err);
});

app.use("/", router)


app.listen(3000, () => {
    console.log('Server is running on port 3000');
})