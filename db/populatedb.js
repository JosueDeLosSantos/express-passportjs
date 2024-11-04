#! /usr/bin/env node

const { Client } = require("pg");
process.loadEnvFile();

const SQL = `
CREATE TABLE users (
   id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
   username VARCHAR ( 255 ),
   password VARCHAR ( 255 )
);
`;

async function main() {
	console.log("seeding...");
	const client = new Client({
		connectionString: process.env.CONNECTION_STRING
	});
	await client.connect();
	await client.query(SQL);
	await client.end();
	console.log("done");
}

main();
