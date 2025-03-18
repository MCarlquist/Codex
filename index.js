
const blessed = require('blessed');

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
    content: 'Hello {bold}world{/bold}!',
    tags: true,
    border: {
        type: 'line'
    },
    style: {
        fg: 'white',
        bg: 'blue',
        border: {
            fg: '#f0f0f0'
        },
        hover: {
            bg: 'green'
        }
    }
});

// Append our box to the screen.
screen.append(box);

// On box click, change content.
box.on('click', (data) => {
    box.setContent('{center}Some different {red-fg}content{/red-fg}.{/center}');
    screen.render();
});

// If box is focused, handle `enter`/`return` and give us some more content.
box.key('enter', function (ch, key) {
    box.setContent('{right}Even different {black-fg}content{/black-fg}.{/right}\n');
    box.setLine(1, 'bar');
    box.insertLine(1, 'foo');
    screen.render();
});

// Quit on Escape, q, or Control-C.
screen.key(['escape', 'q', 'C-c'], (ch, key) => {
    return process.exit(0);
});

// Focus our element.
box.focus();

// Render the screen.
screen.render();
