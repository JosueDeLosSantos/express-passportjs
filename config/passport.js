const pool = require("../db/pool");
const LocalStrategy = require("passport-local").Strategy;
const passport = require("passport");
const bcrypt = require("bcryptjs");

/* 
	This configures the LocalStrategy to fetch the user record 
	from the app's database and verify the password. If that succeeds, 
	the password is valid and the user is authenticated. 
*/
passport.use(
	new LocalStrategy(async (username, password, done) => {
		try {
			const { rows } = await pool.query("SELECT * FROM users WHERE username = $1", [
				username
			]);
			const user = rows[0];

			if (!user) {
				return done(null, false, { message: "Incorrect username" });
			}
			/* if (user.password !== password) {
				return done(null, false, { message: "Incorrect password" });
			} */
			const match = await bcrypt.compare(password, user.password);
			if (!match) {
				// passwords do not match!
				return done(null, false, { message: "Incorrect password" });
			}
			return done(null, user);
		} catch (err) {
			return done(err);
		}
	})
);

/* allow user to stay logged in as they move around our app
When a session is created, passport.serializeUser will receive 
the user object found from a successful login and store its id 
property in the session data. Upon some other request, 
if it finds a matching session for that request, passport.deserializeUser 
will retrieve the id we stored in the session data. 
We then use that id to query our database for the specified user, 
then done(null, user) attaches that user object to req.user. 
Now in the rest of the request, we have access to that user object via 
req.user. we aren’t going to be calling these functions on our own 
and we just need to define them, they’re used in the background by passport.
*/

passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
	try {
		const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
		const user = rows[0];

		done(null, user);
	} catch (err) {
		done(err);
	}
});

module.exports = passport;
