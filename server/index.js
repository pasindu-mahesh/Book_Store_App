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

//route for get all books
app.get('/books', async (request, response) => {
    try {
        const books = await Book.find({});
        return response.status(200).send({
            count: books.length,
            data: books
        });

    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

//route for get one book from databse by ID
app.get('/books/:id', async (request, response) => {
    try {

        const { id } = request.params;

        const book = await Book.findById(id);
        return response.status(200).send(book);

    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

//route for update a book
app.put('/books/:id', async (request, response) => {
    try {
        if (
            !request.body.title ||
            !request.body.auther ||
            !request.body.publisheYear
        ) {
            return response.status(400).send({
                message: 'Please provide all the required fields: title, auther, publisheYear',
            });
        }
        const { id } = request.params;

        const result = await Book.findByIdAndUpdate(id, request.body,);

        if (!result) {
            return response.status(404).json({ message: 'Book not found' });
        }
        return response.status(200).send({ message: 'Book updated successfully' });

    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
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
