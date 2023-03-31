const express = require("express");
const morgan = require("morgan");
const tourRouter = require("./routes/tourRoutes.js");
const userRouter = require("./routes/userRoutes.js");

const app = express();

// calling middlewares
app.use(morgan("dev"));
app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/users", userRouter);

const port = 3000;
app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});