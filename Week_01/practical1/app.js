const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send('Hello World from Express!')
});

app.listen(port, () => {
    console.log(`Express app listening on port ${port}`); // Fixed template string
});

// Importing Module
const chalk = require('chalk'); // npm install chalk@4

// Printing the text 
// console.log(chalk.green('aayush'));

// Getting information out of a path | 
const path = require('node:path');
const fs = require('node:fs');

const notes = 'D:\\BED24\\BED2024Apr_P05_S10262576\\Week_01\\practical1\\files\\notes.txt';

path.dirname(notes); // /users/joe
path.basename(notes); // notes.txt
path.extname(notes); // .txt

fs.readFile('D:\\BED24\\BED2024Apr_P05_S10262576\\Week_01\\practical1\\files\\test.txt', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log(chalk.blue(data)); //chalk.color.data
});

// Writing Files with Node.js
const content = 'Some Content!';

fs.writeFile('D:\\BED24\\BED2024Apr_P05_S10262576\\Week_01\\practical1\\files\\test.txt', content, err => {
    if (err) {
        console.error(err);
    } else {
        console.log(chalk.green("file written successfully"));
    }
});