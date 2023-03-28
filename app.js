// importing packages
const e = require("express");
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
      }
    });
  } else {
    res.status(200).json({
      "status": "success",
      "data": {
        "tour": tour
      }
    });
  }
});

app.post("/api/v1/tours", (req, res) => {
  const newTourId = tours[tours.length-1].id + 1;
  const newTour = {id: newTourId, ...req.body};
  tours.push(newTour);
  fs.writeFile(DB_PATH, JSON.stringify(tours), err => {
    if(err) { 
      res.status(500).json({
        status: "Internal Server Error",
        message: "Some error was occured when writeing data to the database, pleace try to rewrite data",
        data: {}
      });
    }
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

app.patch("/api/v1/tours/:id", (req, res) => {
  const id = req.params.id * 1;
  const updatingTourIndex = tours.findIndex(tour => tour.id === id);
  if(updatingTourIndex === -1) {
    res.status(404).json({
      "status": "not founded",
      "data": {}
    });
  } else {
    const updatedTour = {id, ...req.body}
    tours.splice(updatingTourIndex, 1, updatedTour);
    fs.writeFile(DB_PATH, JSON.stringify(tours), err => {
      if(err) {
        res.status(500).json({
          status: "Internal Server Error",
          message: "Some error was occured when writeing data to the database, pleace try to update data",
          data: {},
        });
      } else {
        res.status(200).json({
          "status": "success",
          "data": {
            "tour": updatedTour
          }
        });
      }
    })
  }
});

app.delete("/api/v1/tours/:id", (req, res) => {
  const deletingTourIndex = tours.findIndex(tour => tour.id === (req.params.id * 1));

  if(deletingTourIndex === -1) {
    res.status(404).json({
      "status": "not founded",
      "data": {}
    });
  } else {
    tours.splice(deletingTourIndex, 1);
    fs.writeFile(DB_PATH, JSON.stringify(tours), err => {
      if(err) { 
        res.status(500).json({
          status: "Internal Server Error",
          message: "Some error was occured when writeing data to the database, pleace try to delete data",
          data: {}
        });
      } else {
        res.status(204).json({
          status: "No Content",
          data: null
        });
      }
    })
  }
});

const port = 3000;
app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});