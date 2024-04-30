const express = require("express");
const bodyParser = require("body-parser");
const booksController = require("./controllers/booksController.js"); // Import controllers
const validateBook = require("./middlewares/validateBook.js"); // Import validateBook
const port = process.env.PORT || 3000;
const app = express();

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

app.use(bodyParser.json()); // Parse incoming JSON data in request body
app.use(bodyParser.urlencoded({ extended: true })); // For form data handling

// Define individual routes for each controller function
app.get("/books", booksController.getAllBooks);
app.get("/books/:id", booksController.getBookById);
app.post("/books", validateBook, booksController.createBook); // Add validateBook before createBook
app.put("/books/:id", validateBook, booksController.updateBook); // Add validateBook before updateBook
app.delete("/books/:id", booksController.deleteBook);

// const greetFunction = require("./models/book.js"); // Import the exported function

// greetFunction("Alice"); // Call the imported function