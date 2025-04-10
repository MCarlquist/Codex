import blessed from 'blessed';
import readline from 'readline';
import { getBooks, saveBooks } from './api/index.js';

// Screen Object
const screen = blessed.screen({
    smartCSR: true,
    cursor: {
        blink: true
    }
});

screen.title = 'Codex';


// Box Object
const box = blessed.box({
    top: 'center',
    left: 'center',
    width: '75%',
    height: '75%',
    content: '',
    tags: true,
    style: {
        
    }
});



const r1 = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


async function run () {
    const books = await getBooks();
    console.log('Books fetched from API');
    
    const bookShelf = Object.keys(books).map((key, index) => {
        return `${index + 1}. the Key ${key}:: ${books[key].title}`;
    });

   box.setContent(bookShelf.join('\n'));
   screen.render();
    
    r1.question('Save books to DB? (y/n): ', async (answer) => {
        if(answer.toLowerCase() === 'yy') {
            await saveBooks(bookShelf);
            console.log('Books saved to DB');
        } else {
            console.log('Books not saved to DB');
        }
        r1.close();
    });
}


run();

screen.append(box);
// Quit on Escape, q, or Control-C.
screen.key(['escape', 'q', 'C-c'], (ch, key) => {
    return process.exit(0);
});



// Render the screen.
screen.render();
