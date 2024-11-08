const express = require("express");
const router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
	res.render("index", { title: "Home page" });
});

router.get("/log-in", function (req, res, next) {
	res.render("log-in-form");
});

router.get("/log-in-error", function (req, res, next) {
	res.render("log-in-error", { message: "Invalid username or password try again" });
});

router.get("/sign-up", function (req, res, next) {
	res.render("sign-up-form");
});

router.get("/success", function (req, res, next) {
	res.render("success");
});

/* GET failure page */
router.get("/failure", function (req, res, next) {
	res.json({ message: "Failure" });
});

module.exports = router;
