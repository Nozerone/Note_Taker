const fs = require("fs");
const express = require("express");
const path = require("path");
const app = express();
const { v4: uuidv4 } = require("uuid");

//Note
const noteData = require("./db/db.json");

const PORT = process.env.PORT || 3001;

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
  body.id = uuidv4();
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
app.post("/api/reviews", (req, res) => {
  const newReview = req.body;
  writeToFile(destination, newReview);
  res.json(`${req.method} received`);
});

app.delete("/api/notes/:id", (req, res) => {
  for (let i = 0; i < noteData.length; i++) {
    if (noteData[i].id == req.params.id) {
      console.log(noteData[i].id);
      console.log(req.params.id);
      noteData.splice(i, 1);
      fs.writeFileSync("./db/db.json", JSON.stringify(noteData));
      res.json(noteData);
    }
  }
});
