const pool = require("./pool");
const bcrypt = require("bcryptjs");

async function getAllUsers() {
	const { rows } = await pool.query("SELECT * FROM users");
	return rows;
}

async function getSession() {
	const { rows } = await pool.query("SELECT * FROM session");
	return rows;
}

async function addUser(username, password) {
	const hashedPassword = await bcrypt.hash(password, 10); // encrypts passwords
	const rows = await pool.query(
		"INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *",
		[username, hashedPassword]
	);
	return rows.rows[0];
}

async function deleteAllUsers() {
	await pool.query("TRUNCATE TABLE users");
}

async function deleteSessions() {
	await pool.query("TRUNCATE TABLE session");
}

module.exports = { getAllUsers, addUser, deleteAllUsers, getSession, deleteSessions };
