
const axios = require('axios').default;

// Get All Books
export async function getBooks() {
    try {
        const response = await axios.get('https://gutendex.com/books/');
        return response.data;
    } catch (error) {
        return error;
    }
}