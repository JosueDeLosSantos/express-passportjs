const express = require("express");
const router = express.Router();
const passport = require("passport");
const usernames = require("../controllers/usernames");
const isAuth = require("../controllers/isAuth");

/* GET users listing. */
router.get("/", usernames.getUsers);

/* DELETE all users. */
router.delete("/", usernames.deleteAllUsers);

/* POST new user. */
router.post("/sign-up", usernames.addNewUser);

/* GET sessions */
router.get("/sessions", usernames.getSessions);

/* POST log in. */
// add a route that will authenticate the user when they submit the form
router.post(
	"/log-in",
	passport.authenticate("local", {
		successRedirect: "/",
		failureRedirect: "/failure"
	})
);

/* GET isUserLoggedIn */
router.get("/is-authenticated", (req, res) => {
	// this is a basic way to check if the user is logged in
	if (req.isAuthenticated()) {
		res.json({ message: "User is logged in" });
	} else {
		res.json({ message: "User is not logged in" });
	}
});

// the following route will check if the user is logged in
// this approach is more modular and preferred
router.get("/is-logged-in", isAuth, (req, res) => {
	res.json({ message: "Passed the security check" });
});

// adds sign out which will terminate the session.
router.post("/log-out", function (req, res, next) {
	req.logout((err) => {
		if (err) {
			return next(err);
		}
		res.redirect("/");
	});
});

module.exports = router;
