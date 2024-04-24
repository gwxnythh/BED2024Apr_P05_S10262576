const express = require('express');
const app = express();
const PORT = 3000;

// Using the public folder at the root (/) of the project
app.use(express.static("public"));

// Using the imagesfolder at the route /images
app.use("/images", express.static("images"));

// GET
app.get("/", (req, res) => {
    response.json(data);
});

// GET - download method
app.get("/download", (req, res) => {
    res.download("images/chan.jpg");
});

// GET - redirent method
app.get("/redirect", (req, res) => {
    res.redirect("http://www.linkedin.com");
});

// GET with next()
app.get("/next", (req, res, next) => {
    console.log("The response will be sent by the next function.");
    next();
}, (req, res) => {
    res.send("I just set up a route with a second callback.");
});

// GET with Routing Parameters
app.get("/class/:id", (req, res) => {
    const studentId = Number(req.params.id); // Number() | Changing a String to a Number

    const student = data.filter((student) => student.id === studentId); // Mock Data  | JavaScript Array Method called 'Filter'
    response.send(student);
});

// POST
app.post("/create", (req, res) => {
    response.send("This is a POST request at /create");
});

// PUT
app.put("/edit", (req, res) => {
    response.send("This is a PUT request at /edit");
});

// DELETE
app.put("/delete", (req, res) => {
    response.send("This is a PUT request at /delete");
});

app.listen(PORT, () => {
    console.log(`The server is running on port ${PORT}`);
});