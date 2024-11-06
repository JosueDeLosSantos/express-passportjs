// dependencies
process.loadEnvFile();
const express = require("express");
const path = require("node:path");
const logger = require("morgan");
const session = require("express-session");
const passport = require("passport");
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const PORT = process.env.PORT || 3000;
const PgSession = require("connect-pg-simple")(session); // psql session store
const pool = require("./db/pool"); // database connection

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
// middlewares
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
/* 
	Since version 1.5.0 of the session module the cookie-parser 
	middleware no longer needs to be used for it to work, Using 
	cookie-parser may result in issues if the secret is not 
	the same between this module and cookie-parser.
*/
app.use(
	// establishes a login session
	session({
		store: new PgSession({
			// connects to database
			pool: pool
		}),
		// generates a random string in the CLI
		// node -e "console.log(require('crypto').randomBytes(16).toString('hex'));"
		secret: process.env.SESSION_SECRET_KEY,
		resave: false,
		/* 
			If true it forces the session to be saved back to the session store, 
			even if the session was never modified during the request. 
			Depending on your store this may be necessary, but it can also 
			create race conditions where a client makes two parallel requests 
			to your server and changes made to the session in one request 
			may get overwritten when the other request ends, even if it made no 
			changes (this behavior also depends on what store you're using). 
		*/
		saveUninitialized: false, // (recommended) don't create session until something stored
		cookie: {
			maxAge: 24 * 60 * 60 * 1000 // 24 hours * 60 minutes * 60 seconds * 1000 milliseconds
			// the following props add additional security to the cookie
			// see the docs for more info:
			// secure: true,
			// sameSite: true
		}
	})
);
require("./config/passport"); // adds passport's local strategy
app.use(passport.initialize()); // refreshes the passport session on every route
app.use(passport.session());
/* 
app.use((req, res, next) => {
	console.log(req.session);
	console.log(req.user);
	next();
}); */

// routes
app.use("/", indexRouter);
app.use("/users", usersRouter);

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
