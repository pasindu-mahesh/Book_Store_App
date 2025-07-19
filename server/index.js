import express, { request, response } from 'express';
import { PORT, mongoURI } from './config.js';
import mongoose from 'mongoose';
import { Book } from './models/bookModel.js';

const app = express();

//middleware to parse JSON
app.use(express.json());

app.get('/', (request, response) => {
    console.log(request);
    return response.status(205).send('Welcome to the Book Store App Server');
});

//route for save anew book
app.post('/books', async (request, response) => {
    try {
        if (
            !request.body.title ||
            !request.body.auther ||
            !request.body.publisheYear
        ) {
            return response.stetus(400).send({
                message: 'Please provide all the required fields: title, auther, publisheYear',
            });
        }
        const newBook = {
            title: request.body.title,
            auther: request.body.auther,
            publisheYear: request.body.publisheYear,
        };
        const book = await Book.create(newBook);

        return response.status(201).send(book);
    } catch (error) {
        console.log(error.message)
        response.status(500).send({ message: error.message })
    }
});

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
