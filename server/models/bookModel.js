import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        auther: {
            type: String,
            required: true,
        },
        publisheYear: {
            type: Number,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

export const Book = mongoose.model('Cat', bookSchema);