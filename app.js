const express = require("express")
const ErrorHandler = require("./middleware/error");
const app= express()
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");


app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(bodyParser.json());
app.use("/",express.static("uploads"))
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));


// config
if (process.env.NODE_ENV !== "PRODUCTION") {
    require("dotenv").config({
      path: "config/.env",
    });
  }

  // import routes
  const user = require("./controller/user");


  app.use("/api/v2/user", user);
// respond with "hello world" when a GET request is made to the homepage


// it's for ErrorHandling
app.use(ErrorHandler);

module.exports = app;