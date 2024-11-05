// dependencies
process.loadEnvFile();
const express = require("express");
const path = require("node:path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const session = require("express-session");
const passport = require("passport");
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const PORT = process.env.PORT || 3000;

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
// middlewares
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(session({ secret: "cats", resave: false, saveUninitialized: false })); // establishes a login session
app.use(passport.session());
require("./config/passport");
// routes
app.use("/", indexRouter);
app.use("/users", usersRouter);

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
