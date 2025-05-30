import express from "express";
import {PORT, MONGO_URI} from "./config.js";
import mongoose from "mongoose";
import booksRouter from "./routes/booksRoute.js"
import cors from "cors";

const app = express();

// JSON parser
app.use(express.json())

// Option 1: Allow all Origin with Default of cors(*)
// app.use(cors());

// Option 2: Allow Custom Origin
app.use(
    cors({
        origin: 'http://localhost:5173',
        method: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type'],
    })
)

app.use('/books', booksRouter)

mongoose
    .connect(MONGO_URI)
    .then(() => {
        console.log("App connected to database")
        app.listen(PORT, () => {
            console.log(`Server is running on port: ${PORT}`)
        })
    })
    .catch((err) => {
        console.log(err)
    });