var  createError = require("http-errors");
var  express = require("express");
var  path = require("path");
var  cookieParser = require("cookie-parser");
var  logger = require("morgan");
const  bodyParser = require("body-parser");
var  mongoose = require("mongoose");
var  app = express();

//setup your mongo database address here
var  mongoServer = "mongodb+srv://sample:WiJmhM9ixlcocrmG@cluster0.7quwu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

//WiJmhM9ixlcocrmG
// connect your mongo
mongoose.connect(
    mongoServer,
    {
    useNewUrlParser:  true,
    useUnifiedTopology:  true,
    useFindAndModify:  false,
    useCreateIndex:  true
    },
    err  => {
    console.log(err ? err : "mongodb connected");
    }
);

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// routes
var  usersRouter = require("../routes/users");

// middleware
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended:  false }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended:  false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

// routes middleware
app.use("/api/v1/users", usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.json({ err });
});

module.exports = app;