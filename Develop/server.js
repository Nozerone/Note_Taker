const fs = require("fs");
const express = require("express");
const path = require("path");
const app = express();


//Note
const noteData = require("./db/db.json");

const PORT = 3001;

// Static middleware pointing to the public folder
app.use(express.static("public"));
app.use(express.json());

//-----------------------------------------------------------//

//HTML Routes

app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "./public/notes.html"))
);
app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "./public/index.html"))
);

//-----------------------------------------------------------//

// API Get requests
app.get("/api/notes", (req, res) => {
  console.info(`${req.method} request received`);
  res.json(noteData);
});

// API Post request
app.post("/api/notes", ({ body }, res) => {
  console.log(body);
  noteData.push(body);
  console.log(noteData);
  fs.writeFileSync("./db/db.json", JSON.stringify(noteData));
  res.json(noteData);
});

// listen() method is responsible for listening for incoming connections on the specified port
app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);

// Example code for POST route (change reviews for Post or Notes)
app.post("api/reviews", (req, res) => {
  const newReview = req.body;
  writeToFile(destination, newReview);
  res.json(`${req.method} received`)
});

