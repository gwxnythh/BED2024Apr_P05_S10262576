const express = require('express'); // import express from "express";
const data = require("./data/mock.json"); // import data from "./data/mock.json";
const app = express();
const PORT = 3000;

// Using the public folder at the root (/) of the project
app.use(express.static("public"));

// Using the imagesfolder at the route /images
app.use("/images", express.static("images"));

// Using express.json and express.urlencoded
// app.use(express.json());
app.use(express.urlencoded({extended: true}));

// GET
app.get("/", (req, res) => {
    response.json(data);
});

// POST - express.json and express.urlencoded
app.post("/item", (req, res) => {
    console.log(req.body);
    res.send(req.body);
});

// GET - download method
app.get("/download", (req, res) => {
    res.download("images/chan.jpg");
});

// GET - redirect method
app.get("/redirect", (req, res) => {
    res.redirect("http://www.linkedin.com");
});

// Route Method with the path "/class" to allow us to chain all of these methods together.
app
    .route("/class")
    .get((req, res) => {
        res.send("Retrieve class info");
        // throw new Error();
    })
    .post((req, res) => {
        res.send("Create class info");
    })
    .put((req, res) => {
        res.send("Update class info");
    })

// Route Chaining
// GET
// app.get("/class", (req, res) => {
//     res.send("Retrieve class info");
// });

// POST
// app.post("/class", (req, res) => {
//     res.send("Create class info");
// });

// PUT
// app.put("/class", (req, res) => {
//     res.send("Update class info");
// });

// GET with next()
app.get("/next", (req, res, next) => {
    console.log("The response will be sent by the next function.");
    next();
}, (req, res) => {
    res.send("I just set up a route with a second callback.");
});

// GET with Routing Parameters
app.get("/class/:id", (req, res) => {
    // Middleware: Access the routing parameters
    const studentId = Number(req.params.id); // Number() | Changing a String to a Number

    const student = data.filter((student) => student.id === studentId); // Mock Data  | JavaScript Array Method called 'Filter'
    // Everything above this line is Middleware
    res.send(student);
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

// Middleware | Error Handler Function 
// app.use((err, req, res, next) => {
//     console.error(err.stack); // Stack represents the stack trace of the error.
//     res.status(500).send("Something is broken!"); // Make our error message as informative as possible for the user based in our application.
// });

app.listen(PORT, () => {
    console.log(`The server is running on port ${PORT}`);
});