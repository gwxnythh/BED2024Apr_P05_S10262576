const express = require('express');
const app = express();
const port = 3000;

app.use(express.static('public'));
//http://localhost:3000/chan.jpg

// app.METHOD(PATH HANDLER)

// GET
app.get('/', (req, res) => {
    res.send('This is a GET request at /');
});

// POST
app.post('/create', (req, res) => {
    res.send('This is a POST request at /create');
});

// PUT
app.put('/edit', (req, res) => {
    res.send('This is a PUT request at /edit');
});

// DELETE
app.delete('/delete', (req, res) => {
    res.send('This is a DELETE request at /delete');
});

// Link Generator
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});