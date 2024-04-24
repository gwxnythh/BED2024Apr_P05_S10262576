const express = require('express'); // import express from "express";
const data = require("./data/mock.json"); // import data from "./data/mock.json";
const app = express();
const PORT = 3000;

app.use(express.json()); // Middleware to parse JSON bodies

let books = data.books; // Initialize books array with mock data

// GET [All Books]
app.get("/books", (req, res) => {
    res.json(books);
});

// GET [A Single Book by ID]
app.get("/books/:id", (req, res) => {
    const bookId = parseInt(req.params.id);
    const book = books.find((book) = book.id === bookId);
    if (book) {
        res.json(book);
    } else {
        res.status(404).send("Book not found");
    }
});

// POST [A New Book]
app.post("/books", (req, res) => {
    const newBook = req.body; // Access data from request body
    newBook.id = books.length + 1;
    books.push(newBook);
    res.status(201).json(newBook);
});

// PUT [Updating a Book]
app.put("/books/:id", (req, res) => {
    const bookId = parseInt(req.params.id);
    const updatedBook = req.body;
    const bookIndex = books.findIndex((book) = book.id === bookId);
    if (bookIndex !== -1) {
        updatedBook.id = bookId;
        books[bookIndex] = updatedBook;
        res.json(updatedBook);
    } else {
        res.status(404).send("Book not found");
    }
});

// DELETE [Deleting a Book]
app.delete("/books/:id", (req, res) => {
    const bookId = parseInt(req.params.id);
    const bookIndex = books.findIndex((book) = book.id === bookId);

    if (bookIndex !== -1) {
        books.splice(bookIndex, 1);
        res.status(204).send();
    } else {
        res.status(404).send("Book not found");
    }
});

app.listen(PORT, () => {
    console.log(`The server is running on port ${PORT}`);
});