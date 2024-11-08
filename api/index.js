// dependencies
process.loadEnvFile();
const express = require("express");
const path = require("node:path");
const logger = require("morgan");
const session = require("express-session");
const passport = require("passport");
const indexRouter = require("../routes/index");
const usersRouter = require("../routes/users");
// const PORT = process.env.PORT || 3000;
const PgSession = require("connect-pg-simple")(session); // psql session store
const pool = require("../db/pool"); // database connection

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "../views"));
app.set("view engine", "ejs");
// middlewares
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "../public")));

app.use(
	session({
		store: new PgSession({
			pool: pool
		}),

		secret: process.env.SESSION_SECRET_KEY,
		resave: false,

		saveUninitialized: false,
		cookie: {
			maxAge: 24 * 60 * 60 * 1000
		}
	})
);
require("../config/passport");
app.use(passport.initialize());
app.use(passport.session());

/* app.use((req, res, next) => {
	console.log(req.session);
	console.log(req.user);
	next();
}); */

// routes
app.use("/", indexRouter);
app.use("/users", usersRouter);

app.listen(3001, () => {
	console.log(`Server is running on port 3001`);
});

module.exports = app;
