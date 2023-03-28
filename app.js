// importing packages
const express = require("express");
const app = express();
const fs = require("fs");

// calling middlewares
app.use(express.json());


const DB_PATH = `${__dirname}/dev-data/data/tours-simple.json`;
const tours = JSON.parse(fs.readFileSync(DB_PATH, "UTF-8"));

app.get("/", (req, res) => {
  res.send("You are reach to home page");
});

app.get("/api/v1/tours", (req, res) => {
  res.status(200).json({
    status: "success",
    results: tours.length,
    data: {
      tours
    }
  });
});

app.get("/api/v1/tours/:id", (req, res) => {
  const id = req.params.id * 1;
  const tour = tours.find(el => el.id === id);
  if(!tour) {
    res.status(404).json({
      "status": "not founded",
      "data": {
        tour 
      }
    });
  } else {
    res.status(200).json({
      "status": "success",
      "data": {
        "tour": "${id} ga teng bo'lgan tour not found"
      }
    });
  }
});

app.post("/api/v1/tours", (req, res) => {
  const newTourId = tours[tours.length-1].id + 1;
  const newTour = {id: newTourId, ...req.body};
  tours.push(newTour);
  fs.writeFile(DB_PATH, JSON.stringify(tours), err => {
    if(err) console.log("Some error was occured when writeing data to file, pleace try to rewrite data");
    else {
      res.status(201).json({
        status: "success",
        data: {
          tour: newTour
        }
      });
    }
  });
});

const port = 3000;
app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});