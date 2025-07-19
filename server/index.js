import express, { response } from 'express';
import { PORT, mongoURI } from './config.js';
import mongoose from 'mongoose';

const app = express();

app.get('/', (request, response) => {
    console.log(request);
    return response.status(205).send('Welcome to the Book Store App Server');
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
