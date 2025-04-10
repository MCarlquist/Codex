import pkg from 'terminal-kit';
const { terminal } = pkg;
import { getBooks } from './api/index.js';
import figlet from 'figlet';

const app = terminal;
app.clear();

figlet("Codex", function (err, data) {
    if (err) {
      console.log("Something went wrong...");
      console.dir(err);
      return;
    }
    console.log(data);
  });


// Handle Ctrl+C or Escape to gracefully exit
app.on('key', (name) => {
    if (name === 'CTRL_C' || name === 'ESCAPE') {
        app.clear();
        app.green("\nExiting...\n");
        app.grabInput(false);
        app.hideCursor();
        process.exit(1);
    }
});

// fetch books from API
const fetchBooks = async () => {
    app.blue("Fetching books...\n");
    const books = await getBooks();
    return books;
};

// Display books in a single-column menu format
const displayBooks = (books) => {  
    const formattedBooks = books.map((title, index) => `${index + 1}. ${title.title} by ${title.authors.map(author => author.name).join(', ')} (Downloads: ${title.download_count})`);
    app.singleColumnMenu(formattedBooks, {
        cancelable: true,
        style: app.green,
        selectedStyle: app.bold.cyan,
    }, (error, response) => {
        if (response.canceled) {
            app.red("\nSelection canceled.\n");
        } else {
            app.green(`\nYou selected: ${formattedBooks[response.selectedIndex]}\n`);
        }
    });
};

// Main function to run the app
const main = async () => {
    app.hideCursor();
    const books = await fetchBooks();
    displayBooks(books);
};

main();
