const express = require("express");
const app = express();
const fs = require("fs");

app.get("/", (req, res) => {
  res.status(200).json({message: "Hello from the server side!", app: "Natours"});
});

app.post("/", (req, res) => {
  res.send("You can post to this endpoint...");
})
app.get('/api/v1/tours', (req, res) => {
  // fs.readFile(`${__dirname}/dev-data/data/tours-simple.json`, "UTF-8", (err, data) => {
  //   res.status(200).json(JSON.parse(data));
  // });
  const readible = fs.createReadStream(`${__dirname}/dev-data/data/tours-simple.json`, "UTF-8");
  readible.pipe(res);

  
});
const port = 3000;
app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});