import mongoose from 'mongoose';

// Book Schema
const bookSchema = new mongoose.Schema({
    title: String,
    author: {
        name: String,
        birth_year: Number,
        death_year: Number
    },
    summary: [String],
    subjects: [String],
    epub: String,
    download_count: Number,
    id: Number,
});

const Book = mongoose.model('Book', bookSchema);
export default Book;