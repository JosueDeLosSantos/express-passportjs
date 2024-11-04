const express = require("express");
const router = express.Router();
const usernames = require("../controllers/usernames");

/* GET users listing. */
router.get("/", usernames.getUsers);

/* POST new user. */
router.post("/sign-up", usernames.addNewUser);

/* DELETE all users. */
router.delete("/", usernames.deleteAllUsers);

module.exports = router;
