const fs = require("fs");
const express = require("express");

const app = express();

//Note 
const noteData = require("./db.json");

const PORT = 3001;

// Static middleware pointing to the public folder
app.use(express.static("public"));

//-----------------------------------------------------------//

//HTML Routes ???
app.get('/', (req,res) => res.send('Visit http://localhost:3001/api'));

app.get("/api", (req, res) => res.json(noteData));






//-----------------------------------------------------------//

// API Get requests
app.get('api/notes', (req, res) => {
    res.json(`${req.method} request received`);
    console.info(`${req.methid} request received`);

});

// API Post request
app.post('/api/notes', (req, res) => {
    res.json(`${req.method} request received to add a note`);
    console.info(`${req.method} request received to add a note`);
}); 




// listen() method is responsible for listening for incoming connections on the specified port
app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);

//Example code for POST route (change reviews for Post or Notes)
app.post("api/reviews", (req, res) => {
  const newReview = req.body;
  writeToFile(destination, newReview);
  res.json(`${req.method} received`);
});
