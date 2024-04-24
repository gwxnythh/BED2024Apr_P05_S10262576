// mkdir books-api | make directory
// cd books-api | change directory
// npm init -y | -y means yes, no need to enter everything

const express = require('express'); // import express
const app = express(); // instantiate the express app
const port = 3000; //  define the port

const bodyParser = require('body-parser'); // import body-parser

// In-memory Book Data [Array to store book data]
let books = [
    { id: 1, title: 'The Lord of the Rings', author: 'J.R.R. Tolkien' },
    { id: 2, title: 'Pride and Prejudice', author: 'Jane Austen' },
];

// Middleware
// parse incoming JSON data in requests
app.use(express.json())
// Configure body-parser to handle URL-encoded form data
app.use(bodyParser.urlencoded({ extended: true })); // Set extended: true for nested objects

// Getting ALL Books (GET /books)
app.get('/books', (req, res) => {
    res.json(books); // Send the array of books as JSON response
});

// Creating a Book (POST /books)
app.post('/books', (req, res) => {
    const newBook = req.body; // Get the new book data from the request body
    newBook.id = books.length + 1; // Assign a unique ID
    books.push(newBook); // Add the new book to the array
    res.status(201).json(newBook); // Send created book with status code 201
});

// Getting a SINGLE Book (GET /books/:id)
app.get('/books/:id', (req, res) => {
    const bookId = parseInt(req.params.id); // Get book ID from URL parameter
    const book = books.find(book => book.id === bookId);

    if (book) {
        res.json(book); // Send the book data if found
    } else {
        res.status(404).send('Book not found'); // Send error for non-existent book
    }
});

// Updating a Book (PUT /books/:id)
app.put('/books/:id', (req, res) => {
    const bookId = parseInt(req.params.id); // Get book ID from URL parameter
    const updatedBook = req.body; // Get updated book data from request body

    const bookIndex = books.findIndex(book => book.id === bookId);

    if (bookIndex !== -1) {
        updatedBook.id = bookId;
        books[bookIndex] = updatedBook; // Update book data in the array
        res.json(updatedBook); // Send updated book data
    } else {
        res.status(404).send('Book not found'); // Send error for non-existent book
    }
});

// Deleting a Book (DELETE /books/:id)
app.delete('/books/:id', (req, res) => {
    const bookId = parseInt(req.params.id); // Get book ID from URL parameter

    const bookIndex = books.findIndex(book => book.id === bookId);

    if (bookIndex !== -1) {
        books.splice(bookIndex, 1); // Remove book from the array
        res.status(204).send(`Book ${bookId} is deleted`); // Send empty response with status code 204 (No Content)
    } else {
        res.status(404).send('Book not found'); // Send error for non-existent book
    }
});

// Starting the Server
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});