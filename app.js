const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));
app.use(cors());

app.use(function (req, res, next) {
  res.setHeader(
    "Content-Security-Policy",
    "default-src *'; font-src *; img-src *; script-src *; style-src *; frame-src *"
  );
  next();
});

module.exports = app;