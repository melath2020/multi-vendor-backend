const express= require("express");
const ErrorHandler = require("./utils/ErrorHandler");
const app= express()
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");
const fileUpload = require("express-fileupload");

app.use(cors({
  origin: ['https://eshop-tutorial-pyri.vercel.app',],
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());

app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use(fileUpload({useTempFiles:true}))


// config
if (process.env.NODE_ENV !== "PRODUCTION") {
    require("dotenv").config({
      path: "config/.env",
    });
  }


// it's for ErrorHandling
app.use(ErrorHandler);


  module.exports= app;