// Remember: This is a simplified example using an in-memory array. In a real-world scenario, you would use a database to store books data persistently.
const books = [
    { id: 1, title: "The Lord of the Rings", author: "J.R.R. Tolkien" },
    { id: 2, title: "Pride and Prejudice", author: "Jane Austen" },
];

class Book {
    constructor(id, title, author) {
      this.id = id;
      this.title = title;
      this.author = author;
    }
  
    static async getAllBooks() {
      const connection = await sql.connect(dbConfig);
  
      const sqlQuery = `SELECT * FROM Books`; // Replace with your actual table name
  
      const request = connection.request();
      const result = await request.query(sqlQuery);
  
      connection.close();
  
      return result.recordset.map(
        (row) => new Book(row.id, row.title, row.author)
      ); // Convert rows to Book objects
    }
  
    static async getBookById(id) {
      const connection = await sql.connect(dbConfig);
  
      const sqlQuery = `SELECT * FROM Books WHERE id = @id`; // Parameterized query
  
      const request = connection.request();
      request.input("id", id);
      const result = await request.query(sqlQuery);
  
      connection.close();
  
      return result.recordset[0]
        ? new Book(
            result.recordset[0].id,
            result.recordset[0].title,
            result.recordset[0].author
          )
        : null; // Handle book not found
    }

    static async createBook(newBookData) {
        const connection = await sql.connect(dbConfig);
    
        const sqlQuery = `INSERT INTO Books (title, author) VALUES (@title, @author); SELECT SCOPE_IDENTITY() AS id;`; // Retrieve ID of inserted record
    
        const request = connection.request();
        request.input("title", newBookData.title);
        request.input("author", newBookData.author);
    
        const result = await request.query(sqlQuery);
    
        connection.close();
    
        // Retrieve the newly created book using its ID
        return this.getBookById(result.recordset[0].id);
      }

      static async updateBook(id, newBookData) {
        const connection = await sql.connect(dbConfig);
    
        const sqlQuery = `UPDATE Books SET title = @title, author = @author WHERE id = @id`; // Parameterized query
    
        const request = connection.request();
        request.input("id", id);
        request.input("title", newBookData.title || null); // Handle optional fields
        request.input("author", newBookData.author || null);
    
        await request.query(sqlQuery);
    
        connection.close();
    
        return this.getBookById(id); // returning the updated book data
      }
    
      static async deleteBook(id) {
        const connection = await sql.connect(dbConfig);
    
        const sqlQuery = `DELETE FROM Books WHERE id = @id`; // Parameterized query
    
        const request = connection.request();
        request.input("id", id);
        const result = await request.query(sqlQuery);
    
        connection.close();
    
        return result.rowsAffected > 0; // Indicate success based on affected rows
      }
    }
  
  
  module.exports = Book;

// const allBooks = Book.getAllBooks();

// In a module file (e.g., book.js)
// function greet(name) {
//     console.log(`Hello, ${name}!`);
// }

// module.exports = greet;