const express = require("express");
const router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
	res.json({ message: "Hello World!" });
});

/* GET failure page */
router.get("/failure", function (req, res, next) {
	res.json({ message: "Failure" });
});

module.exports = router;
