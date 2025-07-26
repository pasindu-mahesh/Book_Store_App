import express, { request, response } from 'express';
import { PORT, mongoURI } from './config.js';
import mongoose from 'mongoose';
import { Book } from './models/bookModel.js';
import booksRoute from './routes/booksRoute.js';
import cors from 'cors';

const app = express();

//middleware to parse JSON
app.use(express.json());

//middleware for handling CORS
app.use(cors());

app.get('/', (request, response) => {
    console.log(request);
    return response.status(205).send('Welcome to the Book Store App Server');
});

app.use ('/books', booksRoute);

mongoose
    .connect(mongoURI)
    .then(() => {
        console.log('Connected to MongoDB successfully...');
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.log(error);
    });
