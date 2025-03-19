import axios from 'axios';
import Book from '../db/Book.js';
import db from '../db/index.js';

// Get All Books
export async function getBooks() {
    try {
        const response = await axios.get('https://gutendex.com/books/');
        return response.data.results;
    } catch (error) {
        return error;
    }
}

// Save Books to DB
export async function saveBooks(books) {
    try {
        for (const book of books) {
            const title = book.title;
            const author = book.authors.map(author => author.name).join(', ');
            const summary = book.summaries;
            const subjects = book.subjects;
            const download_count = book.download_count;
            const epub = book.formats['application/epub+zip'];
            const id = book.id;
            const newBook = new Book({
                title,
                author,
                summary,
                subjects,
                download_count,
                epub,
                id: book.id
            });

            await newBook.save();

            console.log(`Saved ${title} to DB`);
            
        }
    } catch (error) {
        console.error('Error saving books to DB', error);
    }
}