import Conf from "conf";
import bookSchema from './Book.js';

const db = new Conf({
    projectName: "gutenberg",
    projectVersion: "1.0.0",
    configName: "config",
    accessPropertiesByDotNotation: true,
    serialize: (data) => JSON.stringify(data, null, 2),
    deserialize: (data) => JSON.parse(data),
});

export default db;
export const getBooksFromDB = () => {
    const books = db.get("books") || [];
    return books.map((book) => bookSchema.parse(book)); // Validate each book
};