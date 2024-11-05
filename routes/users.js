const express = require("express");
const router = express.Router();
const passport = require("passport");
const usernames = require("../controllers/usernames");

/* GET users listing. */
router.get("/", usernames.getUsers);

/* DELETE all users. */
router.delete("/", usernames.deleteAllUsers);

/* POST new user. */
router.post("/sign-up", usernames.addNewUser);

/* POST log in. */
// add a route that will authenticate the user when they submit the form
router.post(
	"/log-in",
	passport.authenticate("local", {
		successRedirect: "/",
		failureRedirect: "/failure"
	})
);

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
