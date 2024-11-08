const db = require("../db/queries");

async function getUsers(req, res) {
	// get all usernames
	const users = await db.getAllUsers();
	res.json({ users: users });
}

async function getSessions(req, res) {
	// get all usernames
	const sessions = await db.getSession();
	res.json({ sessions: sessions });
}

async function addNewUser(req, res) {
	const { username, password } = req.body;
	await db.addUser(username, password);
	res.render("log-in-form");
}

async function deleteAllUsers(_, res) {
	await db.deleteAllUsers();
	await db.deleteSessions();
	res.json({ message: "All users deleted and sessions" });
}

module.exports = { getUsers, addNewUser, deleteAllUsers, getSessions };
