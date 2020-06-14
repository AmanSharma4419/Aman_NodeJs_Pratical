// All Requires
var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
// Implementing the dotenv file to hide the atlas cloud credentials
require("dotenv").config();
// Mounting The Express Application
var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Adding The Webpack To Run Application In The Single Enviroment!
if (process.env.NODE_ENV.trim() === "development") {
  var webpack = require("webpack");
  var webpackConfig = require("./webpack.config");
  var compiler = webpack(webpackConfig);
  app.use(
    require("webpack-dev-middleware")(compiler, {
      noInfo: true,
      publicPath: webpackConfig.output.publicPath,
    })
  );

  app.use(require("webpack-hot-middleware")(compiler));
}

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
// / DataBase Conection Shifted To Cloud Atlas
const url = `mongodb+srv://Aman:${process.env.DB_CONNECTION_PASSWORD}@cluster0-6xzt7.mongodb.net/test?retryWrites=true&w=majority`;
mongoose.connect(url, { useUnifiedTopology: true }, (err) => {
  try {
    if (err) {
      console.log(err, "Not Connected To DB");
    } else {
      console.log("Connected Sucessfully TO DB");
    }
  } catch (err) {
    console.log(err.message);
  }
});
// Providing The Api Paths

app.use("/api/v1/users", usersRouter);
app.use("/", indexRouter);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});
// Exporting The Server File
module.exports = app;
